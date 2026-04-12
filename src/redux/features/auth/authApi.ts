// src/redux/features/auth/authApi.ts
import { baseApi } from "../../api/baseApi";
import { AuthUser } from "./authSlice";

// ─── Exact backend response wrapper ───────────────────────────────────────────
// All your backend responses follow: { success, message, meta, data: <payload> }
interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta: null;
  data: T;
}

// ─── Auth-specific data shapes ────────────────────────────────────────────────
interface LoginData {
  user: AuthUser;
  accessToken: string; // backend returns "accessToken" NOT "token"
  // No refreshToken — backend doesn't return one currently
}

interface OtpData {
  expiresInSeconds: number;
}

interface VerifyData {
  accessToken: string;
}

// ─── Request types matching backend Zod schemas ───────────────────────────────
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface ChangePasswordRequest {
  oldPassword: string; // backend uses "oldPassword" not "currentPassword"
  newPassword: string;
}

interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  image?: string;
}

// channel: "EMAIL" | "PHONE" — matches backend enum
interface OtpRequest {
  identifier: string;
  channel: "EMAIL" | "PHONE";
}

interface VerifyAccountRequest {
  identifier: string;
  otp: string;
  channel: "EMAIL" | "PHONE";
}

interface ResetPasswordRequest {
  identifier: string;
  otp: string;
  channel: "EMAIL" | "PHONE";
  newPassword: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── POST /auth/register ────────────────────────────────────────────────
    register: builder.mutation<ApiResponse<LoginData>, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // ── POST /auth/login ───────────────────────────────────────────────────
    login: builder.mutation<ApiResponse<LoginData>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ── GET /auth/me ───────────────────────────────────────────────────────
    // Backend route: router.get("/me", authorize("LOGGED_IN"), ...)
    getProfile: builder.query<ApiResponse<AuthUser>, void>({
      query: () => "/auth/me", // ← "/me" NOT "/profile"
      providesTags: ["Auth"],
    }),

    // ── PATCH /auth/update-profile ─────────────────────────────────────────
    updateProfile: builder.mutation<
      ApiResponse<AuthUser>,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/auth/update-profile", // ← matches backend route
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // ── PATCH /auth/change-password ────────────────────────────────────────
    // Backend schema: { oldPassword, newPassword }
    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordRequest>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH", // ← backend uses PATCH not POST
        body: data,
      }),
    }),

    // ── POST /auth/send-verify-otp ─────────────────────────────────────────
    sendVerifyOtp: builder.mutation<ApiResponse<OtpData>, OtpRequest>({
      query: (data) => ({
        url: "/auth/send-verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // ── POST /auth/verify-account ──────────────────────────────────────────
    verifyAccount: builder.mutation<
      ApiResponse<VerifyData>,
      VerifyAccountRequest
    >({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
    }),

    // ── POST /auth/forgot-password ─────────────────────────────────────────
    forgotPassword: builder.mutation<ApiResponse<OtpData>, OtpRequest>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // ── POST /auth/reset-password ──────────────────────────────────────────
    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // ── POST /auth/logout ──────────────────────────────────────────────────
    logoutApi: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSendVerifyOtpMutation,
  useVerifyAccountMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutApiMutation,
} = authApi;
