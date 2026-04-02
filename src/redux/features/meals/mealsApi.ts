// src/redux/features/meals/mealsApi.ts
import { baseApi } from "../../api/baseApi";

export interface Meal {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  breakfast: 0 | 1;
  lunch: 0 | 1;
  dinner: 0 | 1;
  total: number;
  cost: number;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealRate {
  id: string;
  rate: number;
  effectiveFrom: string;
  setBy: string;
  createdAt: string;
}

export interface MealSummary {
  memberId: string;
  memberName: string;
  totalMeals: number;
  totalCost: number;
  currentRate: number;
  month: string;
  year: string;
  breakdown: { breakfast: number; lunch: number; dinner: number };
}

export interface MealsQueryParams {
  page?: number;
  limit?: number;
  memberId?: string;
  date?: string;
  month?: string;
  year?: string;
  addedBy?: string;
}

export interface AddMealPayload {
  memberId: string;
  date: string;
  breakfast: 0 | 1;
  lunch: 0 | 1;
  dinner: 0 | 1;
}

export const mealsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Get all meals ──────────────────────────────────────────────────────
    getMeals: builder.query<{ data: Meal[]; total: number }, MealsQueryParams>({
      query: (params = {}) => ({ url: "/meals", params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Meals" as const, id })),
              { type: "Meals", id: "LIST" },
            ]
          : [{ type: "Meals", id: "LIST" }],
    }),

    // ── Get meal by ID ─────────────────────────────────────────────────────
    getMealById: builder.query<Meal, string>({
      query: (id) => `/meals/${id}`,
      providesTags: (result, error, id) => [{ type: "Meals", id }],
    }),

    // ── Get my meals (member view) ─────────────────────────────────────────
    getMyMeals: builder.query<
      { data: Meal[]; summary: MealSummary },
      { month?: string; year?: string }
    >({
      query: (params) => ({ url: "/meals/my", params }),
      providesTags: ["Meals"],
    }),

    // ── Add meal ───────────────────────────────────────────────────────────
    addMeal: builder.mutation<Meal, AddMealPayload>({
      query: (body) => ({
        url: "/meals",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Meals", id: "LIST" }, "Dashboard", "Members"],
    }),

    // ── Update meal ────────────────────────────────────────────────────────
    updateMeal: builder.mutation<
      Meal,
      { id: string; data: Partial<AddMealPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/meals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Meals", id },
        { type: "Meals", id: "LIST" },
        "Dashboard",
      ],
    }),

    // ── Delete meal ────────────────────────────────────────────────────────
    deleteMeal: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/meals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Meals", id: "LIST" }, "Dashboard"],
    }),

    // ── Get meal summary for a member ──────────────────────────────────────
    getMealSummary: builder.query<
      MealSummary,
      { memberId: string; month: string; year: string }
    >({
      query: ({ memberId, month, year }) =>
        `/meals/summary/${memberId}?month=${month}&year=${year}`,
      providesTags: ["Meals"],
    }),

    // ── Get current meal rate ──────────────────────────────────────────────
    getCurrentRate: builder.query<MealRate, void>({
      query: () => "/meals/rate/current",
      providesTags: ["MealRate"],
    }),

    // ── Get rate history ───────────────────────────────────────────────────
    getRateHistory: builder.query<MealRate[], void>({
      query: () => "/meals/rate/history",
      providesTags: ["MealRate"],
    }),

    // ── Update meal rate ───────────────────────────────────────────────────
    updateMealRate: builder.mutation<
      MealRate,
      { rate: number; effectiveFrom: string }
    >({
      query: (body) => ({
        url: "/meals/rate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MealRate", "Dashboard", "Meals"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMealsQuery,
  useGetMealByIdQuery,
  useGetMyMealsQuery,
  useAddMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
  useGetMealSummaryQuery,
  useGetCurrentRateQuery,
  useGetRateHistoryQuery,
  useUpdateMealRateMutation,
} = mealsApi;
