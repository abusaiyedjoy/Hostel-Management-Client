// src/redux/features/auth/authApi.ts
import { baseApi } from "../../api/baseApi";
import { AuthUser } from "./authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  roomNumber?: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Login ──────────────────────────────────────────────────────────────
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ── Register ───────────────────────────────────────────────────────────
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // ── Logout ─────────────────────────────────────────────────────────────
    logoutApi: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // ── Get profile ────────────────────────────────────────────────────────
    getProfile: builder.query<AuthUser, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),

    // ── Update profile ─────────────────────────────────────────────────────
    updateProfile: builder.mutation<AuthUser, Partial<AuthUser>>({
      query: (data) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // ── Change password ────────────────────────────────────────────────────
    changePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // ── Refresh token ──────────────────────────────────────────────────────
    refreshToken: builder.mutation<{ token: string }, { refreshToken: string }>(
      {
        query: (body) => ({
          url: "/auth/refresh",
          method: "POST",
          body,
        }),
      },
    ),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutApiMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
} = authApi;
