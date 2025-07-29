"use client";

import { AuthProvider } from "@/contexts/auth-context-sqlite";
import {
  GlobalStateContext,
  useGlobalStateData,
} from "@/hooks/use-global-state";
import type { ReactNode } from "react";

function GlobalStateProvider({ children }: { children: ReactNode }) {
  const state = useGlobalStateData();
  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <GlobalStateProvider>{children}</GlobalStateProvider>
    </AuthProvider>
  );
}
