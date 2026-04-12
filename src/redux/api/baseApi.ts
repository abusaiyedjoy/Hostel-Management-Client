// src/redux/api/baseApi.ts
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "../features/auth/authSlice";
import { RootState } from "../store/store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api";

// ─── Raw base query with Bearer token ────────────────────────────────────────
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // Do NOT set Content-Type here — fetchBaseQuery sets it automatically
    // and setting it manually breaks multipart/form-data uploads
    return headers;
  },
});

// ─── Re-auth wrapper ──────────────────────────────────────────────────────────
// Your backend uses POST /auth/new-access-token (seen in Postman sidebar)
// to get a new access token. Adjust URL if needed.
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Try to refresh — backend route: POST /auth/new-access-token
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/new-access-token",
        method: "POST",
        // Your backend may use httpOnly cookie for refresh token
        // If so, no body needed — credentials are sent automatically
        credentials: "include",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // Backend wraps response: { success, message, data: { accessToken } }
      const newToken = (refreshResult.data as any)?.data?.accessToken;
      if (newToken) {
        api.dispatch(setToken(newToken));
        // Retry the original request with new token
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// ─── Root API ─────────────────────────────────────────────────────────────────
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "User",
    "Members",
    "Meals",
    "MealRate",
    "Payments",
    "Managers",
    "Dashboard",
    "Rooms",
    "Notifications",
    "Mess",
  ],
  endpoints: () => ({}),
});
