// src/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ── Matches backend Role enum exactly (UPPERCASE) ─────────────────────────────
export type Role = "ADMIN" | "MESS_MANAGER" | "MEAL_MANAGER" | "MEMBER";

// ── Matches backend safeUserSelect + login response exactly ───────────────────
export interface MemberProfile {
  id: string;
  registrationNo?: string;
  totalBalance?: number;
  dateOfJoining?: string;
  mess?: {
    id: string;
    name: string;
    city: string;
    ratePerMeal?: number;
  };
}

export interface MealManagerProfile {
  id: string;
  mess?: { id: string; name: string; city?: string };
}

export interface MessManagerProfile {
  id: string;
  name: string;
  city?: string;
  capacity?: number;
  ratePerMeal?: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  image?: string | null;
  isActive: boolean;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Nested role profiles — present in login + getMe response
  member?: MemberProfile | null;
  mealManager?: MealManagerProfile | null;
  messManager?: MessManagerProfile | null;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null; // backend doesn't return this yet — kept for future
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        token: string;
        refreshToken?: string | null;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, updateUser, setToken, logout, setLoading } =
  authSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCurrentUser = (s: { auth: AuthState }) => s.auth.user;
export const selectCurrentToken = (s: { auth: AuthState }) => s.auth.token;
export const selectIsAuthenticated = (s: { auth: AuthState }) =>
  s.auth.isAuthenticated;
export const selectIsAuthLoading = (s: { auth: AuthState }) => s.auth.isLoading;
export const selectUserRole = (s: { auth: AuthState }) => s.auth.user?.role;

// Role guards — uppercase to match backend enum
export const selectIsAdmin = (s: { auth: AuthState }) =>
  s.auth.user?.role === "ADMIN";
export const selectIsMessManager = (s: { auth: AuthState }) =>
  s.auth.user?.role === "MESS_MANAGER";
export const selectIsMealManager = (s: { auth: AuthState }) =>
  s.auth.user?.role === "MEAL_MANAGER";
export const selectIsMember = (s: { auth: AuthState }) =>
  s.auth.user?.role === "MEMBER";

// Convenience: get the nested profile for the current role
export const selectMemberProfile = (s: { auth: AuthState }) =>
  s.auth.user?.member;
export const selectMealManagerProfile = (s: { auth: AuthState }) =>
  s.auth.user?.mealManager;
export const selectMessManagerProfile = (s: { auth: AuthState }) =>
  s.auth.user?.messManager;

export default authSlice.reducer;
