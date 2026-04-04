// src/hooks/useBkashPayment.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useInitiateBkashPaymentMutation,
  useExecuteBkashPaymentMutation,
  addNotification,
  useAppDispatch,
} from "@/redux";

export type BkashStep =
  | "idle"
  | "initiating"
  | "redirect"
  | "executing"
  | "success"
  | "failed";

export function useBkashPayment() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<BkashStep>("idle");
  const [paymentID, setPaymentID] = useState<string | null>(null);
  const [trxID, setTrxID] = useState<string | null>(null);

  const [initiate] = useInitiateBkashPaymentMutation();
  const [execute] = useExecuteBkashPaymentMutation();

  // Step 1 — create payment session
  const startPayment = async (amount: number, month: string, year: string) => {
    setStep("initiating");
    try {
      const result = await initiate({ amount, month, year }).unwrap();
      setPaymentID(result.paymentID);
      setStep("redirect");

      // Open bKash payment URL in same tab (bKash standard flow)
      window.location.href = result.bkashURL;
    } catch (err: any) {
      setStep("failed");
      toast.error(err?.data?.message ?? "Could not initiate bKash payment");
    }
  };

  // Step 2 — execute after bKash redirects back with paymentID
  const confirmPayment = async (pid: string) => {
    setStep("executing");
    try {
      const result = await execute({ paymentID: pid }).unwrap();
      setTrxID(result.trxID);
      setStep("success");

      dispatch(
        addNotification({
          title: "Payment successful",
          message: `৳${result.amount} paid. Txn: ${result.trxID}`,
          type: "success",
        }),
      );

      toast.success("Payment confirmed!");
    } catch (err: any) {
      setStep("failed");
      toast.error(err?.data?.message ?? "Payment execution failed");
    }
  };

  const reset = () => {
    setStep("idle");
    setPaymentID(null);
    setTrxID(null);
  };

  return { step, paymentID, trxID, startPayment, confirmPayment, reset };
}
