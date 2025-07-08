import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {" "}
      {/*! HydratedBoundary server par fetch kiya gaya data ko client par
      transfer karta hai, taki user ko smooth experience mile aur unnecessary
      API calls na ho!*/}
      <Suspense fallback={<AgentsViewLoading />}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
        <AgentsView />;
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
