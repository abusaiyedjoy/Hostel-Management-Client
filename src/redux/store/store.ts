// src/redux/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  ui: uiReducer,
});

// ─── localStorage persistence ─────────────────────────────────────────────────
const AUTH_STORAGE_KEY = "staynest_auth";

function loadAuthFromStorage() {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function saveAuthToStorage(state: ReturnType<typeof rootReducer>) {
  if (typeof window === "undefined") return;
  try {
    const { user, token, isAuthenticated } = state.auth;
    // refreshToken omitted — backend uses httpOnly cookie for refresh
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, token, isAuthenticated }),
    );
  } catch {
    // ignore
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      ...(loadAuthFromStorage() ?? {}),
    },
  } as any,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "api/executeQuery/fulfilled",
          "api/executeMutation/fulfilled",
        ],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(() => {
  saveAuthToStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
