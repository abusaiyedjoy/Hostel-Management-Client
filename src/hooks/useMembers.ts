// // src/hooks/useMembers.ts
// "use client";

// import { toast } from "sonner";
// import {
//   useGetMembersQuery,
//   useCreateMemberMutation,
//   useUpdateMemberMutation,
//   useDeleteMemberMutation,
//   useToggleMemberStatusMutation,
//   Member,
//   MemberQueryParams,
// } from "@/redux/features/members/membersApi";

// export function useMembers(params: MemberQueryParams = {}) {
//   const { data, isLoading, isFetching, isError, refetch } =
//     useGetMembersQuery(params);

//   const [createMutation, { isLoading: isCreating }] = useCreateMemberMutation();
//   const [updateMutation, { isLoading: isUpdating }] = useUpdateMemberMutation();
//   const [deleteMutation, { isLoading: isDeleting }] = useDeleteMemberMutation();
//   const [toggleMutation, { isLoading: isToggling }] =
//     useToggleMemberStatusMutation();

//   const createMember = async (data: Partial<Member>) => {
//     try {
//       await createMutation(data).unwrap();
//       toast.success("Member added!");
//     } catch (err: any) {
//       toast.error(err?.data?.message ?? "Failed to add member");
//       throw err;
//     }
//   };

//   const updateMember = async (id: string, data: Partial<Member>) => {
//     try {
//       await updateMutation({ id, data }).unwrap();
//       toast.success("Member updated!");
//     } catch (err: any) {
//       toast.error(err?.data?.message ?? "Failed to update member");
//       throw err;
//     }
//   };

//   const deleteMember = async (id: string) => {
//     try {
//       await deleteMutation(id).unwrap();
//       toast.success("Member removed.");
//     } catch (err: any) {
//       toast.error(err?.data?.message ?? "Failed to remove member");
//       throw err;
//     }
//   };

//   const toggleStatus = async (id: string) => {
//     try {
//       const result = await toggleMutation(id).unwrap();
//       toast.success(
//         `Member ${result.status === "active" ? "activated" : "deactivated"}`,
//       );
//     } catch (err: any) {
//       toast.error(err?.data?.message ?? "Failed to update status");
//       throw err;
//     }
//   };

//   return {
//     members: data?.data ?? [],
//     total: data?.total ?? 0,
//     page: data?.page ?? 1,
//     isLoading,
//     isFetching,
//     isError,
//     isCreating,
//     isUpdating,
//     isDeleting,
//     isToggling,
//     refetch,
//     createMember,
//     updateMember,
//     deleteMember,
//     toggleStatus,
//   };
// }
