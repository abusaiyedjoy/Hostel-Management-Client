import { baseApi } from "../../api/baseApi";
import { AuthUser } from "./authSlice";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta: null;
  data: T;
}

interface LoginData {
  user: AuthUser;
  accessToken: string;
}

interface OtpData {
  expiresInSeconds: number;
}

interface VerifyData {
  accessToken: string;
}

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
  oldPassword: string;
  newPassword: string;
}

interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  image?: string;
}

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
    register: builder.mutation<ApiResponse<LoginData>, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    googleLogin: builder.mutation<ApiResponse<LoginData>, { idToken: string }>({
      query: (data) => ({
        url: "/auth/google-login",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation<ApiResponse<LoginData>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    allUsers: builder.query<ApiResponse<AuthUser[]>, void>({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),

    getProfile: builder.query<ApiResponse<AuthUser>, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

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

    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordRequest>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    sendVerifyOtp: builder.mutation<ApiResponse<OtpData>, OtpRequest>({
      query: (data) => ({
        url: "/auth/send-verify-otp",
        method: "POST",
        body: data,
      }),
    }),

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

    forgotPassword: builder.mutation<ApiResponse<OtpData>, OtpRequest>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

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
  useGoogleLoginMutation,
  useLoginMutation,
  useAllUsersQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSendVerifyOtpMutation,
  useVerifyAccountMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutApiMutation,
} = authApi;
