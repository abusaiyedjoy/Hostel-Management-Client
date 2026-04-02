// src/redux/features/payments/paymentsApi.ts
import { baseApi } from "../../api/baseApi";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentMethod = "bkash" | "cash" | "bank";

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  bkashTrxId?: string;
  month: string;
  year: string;
  paidAt?: string;
  createdAt: string;
}

export interface BkashInitResponse {
  paymentID: string;
  bkashURL: string;
  statusCode: string;
  statusMessage: string;
  paymentCreateTime: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
}

export interface BkashExecuteResponse {
  statusCode: string;
  statusMessage: string;
  paymentID: string;
  trxID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  paymentExecuteTime: string;
  merchantInvoiceNumber: string;
}

export interface PaymentsQueryParams {
  page?: number;
  limit?: number;
  status?: PaymentStatus | "all";
  month?: string;
  year?: string;
  memberId?: string;
}

export interface PaymentSummary {
  totalCollected: number;
  totalPending: number;
  thisMonth: number;
  lastMonth: number;
  totalMembers: number;
  paidMembers: number;
}

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Get all payments ───────────────────────────────────────────────────
    getPayments: builder.query<
      { data: Payment[]; total: number; summary: PaymentSummary },
      PaymentsQueryParams
    >({
      query: (params = {}) => ({ url: "/payments", params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Payments" as const,
                id,
              })),
              { type: "Payments", id: "LIST" },
            ]
          : [{ type: "Payments", id: "LIST" }],
    }),

    // ── Get my payments (member view) ──────────────────────────────────────
    getMyPayments: builder.query<
      { data: Payment[]; total: number },
      PaymentsQueryParams
    >({
      query: (params = {}) => ({ url: "/payments/my", params }),
      providesTags: ["Payments"],
    }),

    // ── Get payment summary ────────────────────────────────────────────────
    getPaymentSummary: builder.query<
      PaymentSummary,
      { month?: string; year?: string }
    >({
      query: (params) => ({ url: "/payments/summary", params }),
      providesTags: ["Payments", "Dashboard"],
    }),

    // ── Initiate bKash payment ─────────────────────────────────────────────
    initiateBkashPayment: builder.mutation<
      BkashInitResponse,
      { amount: number; month: string; year: string }
    >({
      query: (body) => ({
        url: "/payments/bkash/create",
        method: "POST",
        body,
      }),
    }),

    // ── Execute bKash payment (after redirect) ─────────────────────────────
    executeBkashPayment: builder.mutation<
      BkashExecuteResponse,
      { paymentID: string }
    >({
      query: (body) => ({
        url: "/payments/bkash/execute",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Payments", id: "LIST" },
        "Dashboard",
        "Members",
      ],
    }),

    // ── Record cash/manual payment (admin) ─────────────────────────────────
    recordPayment: builder.mutation<
      Payment,
      {
        memberId: string;
        amount: number;
        method: PaymentMethod;
        month: string;
        year: string;
      }
    >({
      query: (body) => ({
        url: "/payments/manual",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Payments", id: "LIST" }, "Dashboard"],
    }),

    // ── Get payment by ID ──────────────────────────────────────────────────
    getPaymentById: builder.query<Payment, string>({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: "Payments", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPaymentsQuery,
  useGetMyPaymentsQuery,
  useGetPaymentSummaryQuery,
  useInitiateBkashPaymentMutation,
  useExecuteBkashPaymentMutation,
  useRecordPaymentMutation,
  useGetPaymentByIdQuery,
} = paymentsApi;
