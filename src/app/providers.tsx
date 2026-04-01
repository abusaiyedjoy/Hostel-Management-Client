"use client";

import * as React from "react";
import { Provider } from "react-redux";
// import { persistor, store } from "../redux/store";
import { Toaster } from "sonner";
// import { PersistGate } from "redux-persist/integration/react";
import ReduxProvider from "@/redux/reduxProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Toaster richColors position="top-center" />
      {children}
      {/* </PersistGate> */}
    </ReduxProvider>
  );
}
