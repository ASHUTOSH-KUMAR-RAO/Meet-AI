import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import  MeetingView, {MeetingsViewError, MeetingsViewLoading,} from "@/modules/meetings/ui/views/meeting-view"
 
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsViewError /> }>
          <MeetingView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page
