// src/hooks/useSocket.ts
"use client";

import { useEffect, useRef, useState } from "react";

import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  selectCurrentToken,
  selectIsAuthenticated,
} from "@/redux/features/auth/authSlice";
import { addNotification } from "@/redux/features/ui/uiSlice";
import { baseApi } from "@/redux/api/baseApi";
import { toast } from "sonner";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export const SOCKET_EVENTS = {
  MEAL_ADDED: "meal:added",
  MEAL_UPDATED: "meal:updated",
  MEAL_DELETED: "meal:deleted",
  MEAL_RATE_UPDATED: "meal:rate_updated",
  PAYMENT_RECEIVED: "payment:received",
  PAYMENT_FAILED: "payment:failed",
  MEMBER_JOINED: "member:joined",
  NOTIFICATION: "notification",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
} as const;

export function useSocket() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on(SOCKET_EVENTS.CONNECT, () => setConnected(true));
    socket.on(SOCKET_EVENTS.DISCONNECT, () => setConnected(false));

    // ── Meal events → invalidate RTK Query cache ─────────────────────────
    socket.on(SOCKET_EVENTS.MEAL_ADDED, (data: any) => {
      // Invalidate meals + dashboard cache so UI re-fetches automatically
      dispatch(baseApi.util.invalidateTags(["Meals", "Dashboard"]));
      dispatch(
        addNotification({
          title: "Meal added",
          message: `${data.memberName} — ${data.total} meal(s)`,
          type: "info",
        }),
      );
    });

    socket.on(SOCKET_EVENTS.MEAL_UPDATED, () => {
      dispatch(baseApi.util.invalidateTags(["Meals", "Dashboard"]));
    });

    socket.on(SOCKET_EVENTS.MEAL_DELETED, () => {
      dispatch(baseApi.util.invalidateTags(["Meals", "Dashboard"]));
    });

    // ── Rate update ───────────────────────────────────────────────────────
    socket.on(SOCKET_EVENTS.MEAL_RATE_UPDATED, (data: any) => {
      dispatch(baseApi.util.invalidateTags(["MealRate", "Dashboard", "Meals"]));
      toast.info(`Meal rate updated to ৳${data.rate}/meal`);
      dispatch(
        addNotification({
          title: "Meal rate updated",
          message: `New rate: ৳${data.rate} — effective ${data.effectiveFrom}`,
          type: "warning",
        }),
      );
    });

    // ── Payment events ────────────────────────────────────────────────────
    socket.on(SOCKET_EVENTS.PAYMENT_RECEIVED, (data: any) => {
      dispatch(
        baseApi.util.invalidateTags(["Payments", "Dashboard", "Members"]),
      );
      toast.success(`Payment of ৳${data.amount} received!`);
      dispatch(
        addNotification({
          title: "Payment received",
          message: `৳${data.amount} via bKash — Txn: ${data.trxId}`,
          type: "success",
        }),
      );
    });

    socket.on(SOCKET_EVENTS.PAYMENT_FAILED, (data: any) => {
      dispatch(
        addNotification({
          title: "Payment failed",
          message: data.message ?? "A payment attempt failed",
          type: "error",
        }),
      );
    });

    // ── Member events ─────────────────────────────────────────────────────
    socket.on(SOCKET_EVENTS.MEMBER_JOINED, (data: any) => {
      dispatch(baseApi.util.invalidateTags(["Members", "Dashboard"]));
      dispatch(
        addNotification({
          title: "New member",
          message: `${data.name} joined the hostel`,
          type: "info",
        }),
      );
    });

    // ── Generic server notification ───────────────────────────────────────
    socket.on(SOCKET_EVENTS.NOTIFICATION, (data: any) => {
      dispatch(
        addNotification({
          title: data.title,
          message: data.message,
          type: data.type ?? "info",
        }),
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, token, dispatch]);

  return { socket: socketRef.current, connected };
}
