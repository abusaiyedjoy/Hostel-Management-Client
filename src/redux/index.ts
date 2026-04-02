// src/redux/index.ts  — import everything from here

// Store
export { store } from "./store/store";
export type { RootState, AppDispatch } from "./store/store";
export { useAppDispatch, useAppSelector } from "./store/hooks";

// Auth
export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useLogoutApiMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
} from "./features/auth/authApi";

export {
  setCredentials,
  updateUser,
  setToken,
  logout,
  setLoading,
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectIsAuthLoading,
  selectUserRole,
  selectIsAdmin,
  selectIsMessManager,
  selectIsMealManager,
  selectIsMember,
} from "./features/auth/authSlice";

export type { AuthUser, Role } from "./features/auth/authSlice";

// Members
// export {
//   membersApi,
//   useGetMembersQuery,
//   useGetMemberByIdQuery,
//   useCreateMemberMutation,
//   useUpdateMemberMutation,
//   useDeleteMemberMutation,
//   useToggleMemberStatusMutation,
// } from "./features/members/membersApi";

// export type { Member, MembersResponse } from "./features/members/membersApi";

// Meals
export {
  mealsApi,
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
} from "./features/meals/mealsApi";

export type { Meal, MealRate, MealSummary } from "./features/meals/mealsApi";

// Payments
export {
  paymentsApi,
  useGetPaymentsQuery,
  useGetMyPaymentsQuery,
  useGetPaymentSummaryQuery,
  useInitiateBkashPaymentMutation,
  useExecuteBkashPaymentMutation,
  useRecordPaymentMutation,
  useGetPaymentByIdQuery,
} from "./features/payments/paymentsApi";

export type { Payment, PaymentSummary } from "./features/payments/paymentsApi";

// Managers
// export {
//   managersApi,
//   useGetManagersQuery,
//   useAssignManagerMutation,
//   useRemoveManagerMutation,
//   useChangeManagerRoleMutation,
// } from "./features/managers/managersApi";

// Dashboard
// export {
//   dashboardApi,
//   useGetAdminStatsQuery,
//   useGetMessManagerStatsQuery,
//   useGetMealManagerStatsQuery,
//   useGetMemberStatsQuery,
//   useGetMonthlyTrendQuery,
// } from "./features/dashboard/dashboardApi";

// UI
export {
  toggleSidebar,
  setSidebarCollapsed,
  openModal,
  closeModal,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  clearNotifications,
  setPageLoading,
  selectSidebarCollapsed,
  selectActiveModal,
  selectModalData,
  selectNotifications,
  selectUnreadCount,
  selectIsPageLoading,
} from "./features/ui/uiSlice";

export type { Notification } from "./features/ui/uiSlice";
