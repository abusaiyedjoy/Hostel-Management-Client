// src/hooks/useMeals.ts
// Example of using RTK Query mutations with optimistic updates + error rollback
"use client";

import { toast } from "sonner";
import {
  useAddMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
  useGetCurrentRateQuery,
  useUpdateMealRateMutation,
  useGetMealsQuery,
  addNotification,
  useAppDispatch,
} from "@/redux";
import {
  MealsQueryParams,
  AddMealPayload,
} from "@/redux/features/meals/mealsApi";

export function useMeals(params: MealsQueryParams = {}) {
  const dispatch = useAppDispatch();

  // ── Queries ──────────────────────────────────────────────────────────────
  const {
    data: mealsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMealsQuery(params);

  const { data: currentRate } = useGetCurrentRateQuery();

  // ── Mutations ─────────────────────────────────────────────────────────────
  const [addMealMutation, { isLoading: isAdding }] = useAddMealMutation();
  const [updateMealMutation, { isLoading: isUpdating }] =
    useUpdateMealMutation();
  const [deleteMealMutation, { isLoading: isDeleting }] =
    useDeleteMealMutation();
  const [updateRateMutation, { isLoading: isUpdatingRate }] =
    useUpdateMealRateMutation();

  const addMeal = async (payload: AddMealPayload) => {
    try {
      await addMealMutation(payload).unwrap();
      toast.success("Meal added successfully!");
      // RTK Query auto-invalidates 'Meals' + 'Dashboard' tags
      // so all queries using those tags re-fetch automatically
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to add meal");
      throw err;
    }
  };

  const updateMeal = async (id: string, data: Partial<AddMealPayload>) => {
    try {
      await updateMealMutation({ id, data }).unwrap();
      toast.success("Meal updated!");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to update meal");
      throw err;
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      await deleteMealMutation(id).unwrap();
      toast.success("Meal entry deleted.");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to delete meal");
      throw err;
    }
  };

  const updateRate = async (rate: number, effectiveFrom: string) => {
    try {
      await updateRateMutation({ rate, effectiveFrom }).unwrap();
      toast.success(`Meal rate updated to ৳${rate}`);
      dispatch(
        addNotification({
          title: "Meal rate changed",
          message: `Rate set to ৳${rate} from ${effectiveFrom}`,
          type: "warning",
        }),
      );
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to update rate");
      throw err;
    }
  };

  return {
    meals: mealsData?.data ?? [],
    total: mealsData?.total ?? 0,
    currentRate: currentRate?.rate,
    isLoading,
    isFetching,
    isError,
    isAdding,
    isUpdating,
    isDeleting,
    isUpdatingRate,
    refetch,
    addMeal,
    updateMeal,
    deleteMeal,
    updateRate,
  };
}
