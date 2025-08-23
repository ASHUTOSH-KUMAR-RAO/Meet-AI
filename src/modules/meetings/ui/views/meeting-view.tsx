"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import DataPagination from "@/components/data-pagination";

const MeetingView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 flex pb-4 px-4 md:px-8 flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create Your First Meeting"
          description="Shedule a meeting to get started. Each meeting can have multiple agents that can interact with participants during the call.and as well as real time transcription and meeting summary"
        />
      )}
    </div>
  );
};

export default MeetingView;

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading..."
      description="Please wait while we fetch your data"
    />
  );
};
export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Access Denied"
      description="You don't have permission to access this resource."
    />
  );
};
