"use client";

import {
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
  HydrationBoundary,
} from "@tanstack/react-query";
import { useState } from "react";

export function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
