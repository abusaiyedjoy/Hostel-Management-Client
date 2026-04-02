// src/redux/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";

// ─── Root reducer ─────────────────────────────────────────────────────────────
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  ui: uiReducer,
});

// ─── localStorage persistence helpers ────────────────────────────────────────
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
    const { user, token, refreshToken, isAuthenticated } = state.auth;
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, token, refreshToken, isAuthenticated }),
    );
  } catch {
    // ignore write errors
  }
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      ...(loadAuthFromStorage() ?? {}),
      isLoading: false,
    },
  } as any,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // RTK Query uses non-serializable values internally
        ignoredActions: [
          "api/executeQuery/fulfilled",
          "api/executeMutation/fulfilled",
        ],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Subscribe: persist auth state on every change
store.subscribe(() => {
  saveAuthToStorage(store.getState());
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
