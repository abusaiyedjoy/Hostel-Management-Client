// src/redux/features/mess/messApi.ts
import { baseApi } from "../../api/baseApi";

// ─── Types matching actual API responses ──────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta: ApiMeta | null;
  data: T;
}

interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MessManager {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface MessCount {
  members: number;
  mealManagers: number;
  meals: number;
}

export interface Mess {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  capacity: number;
  ratePerMeal: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  manager: MessManager | null;
  _count: MessCount;
}

export interface RecentMeal {
  id: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER";
  date: string;
  costPerMeal: number;
  totalCost: number;
  _count: { mealEntries: number };
}

export interface MessStats {
  totalMembers: number;
  totalMeals: number;
  totalMealEntries: number;
  recentMeals: RecentMeal[];
}

// ─── Request types matching backend Zod schemas ───────────────────────────────

export interface CreateMessRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  capacity: number;
  ratePerMeal: number;
}

export interface UpdateMessRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  capacity?: number;
  ratePerMeal?: number;
  isActive?: boolean;
}

export interface GetAllMessQuery {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  isActive?: boolean;
}

// ─── API endpoints ────────────────────────────────────────────────────────────
export const messApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── POST /mess  (ADMIN only) ───────────────────────────────────────────
    createMess: builder.mutation<ApiResponse<Mess>, CreateMessRequest>({
      query: (data) => ({
        url: "/mess",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mess"],
    }),

    // ── DELETE /mess/:id  (ADMIN only) ────────────────────────────────────
    deleteMess: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/mess/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mess"],
    }),

    // ── GET /mess  (all authenticated users) ──────────────────────────────
    getAllMess: builder.query<ApiResponse<Mess[]>, GetAllMessQuery>({
      query: (params = {}) => ({ url: "/mess", params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Mess" as const, id })),
              { type: "Mess", id: "LIST" },
            ]
          : [{ type: "Mess", id: "LIST" }],
    }),

    // ── GET /mess/:id  (all authenticated users) ──────────────────────────
    getMessById: builder.query<ApiResponse<Mess>, string>({
      query: (id) => `/mess/${id}`,
      providesTags: (result, error, id) => [{ type: "Mess", id }],
    }),

    // ── GET /mess/my-mess  (MESS_MANAGER only) ────────────────────────────
    getMyMess: builder.query<ApiResponse<Mess>, void>({
      query: () => "/mess/my-mess",
      providesTags: ["Mess"],
    }),

    // ── GET /mess/:id/stats  (ADMIN + MESS_MANAGER) ───────────────────────
    getMessStats: builder.query<ApiResponse<MessStats>, string>({
      query: (id) => `/mess/${id}/stats`,
      providesTags: (result, error, id) => [
        { type: "Mess", id: `stats-${id}` },
      ],
    }),

    // ── PATCH /mess/:id  (ADMIN + MESS_MANAGER) ───────────────────────────
    updateMess: builder.mutation<
      ApiResponse<Mess>,
      { id: string; data: UpdateMessRequest }
    >({
      query: ({ id, data }) => ({
        url: `/mess/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Mess", id },
        { type: "Mess", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateMessMutation,
  useDeleteMessMutation,
  useGetAllMessQuery,
  useGetMessByIdQuery,
  useGetMyMessQuery,
  useGetMessStatsQuery,
  useUpdateMessMutation,
} = messApi;
