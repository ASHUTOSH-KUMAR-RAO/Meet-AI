"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirmDanger } from "../../hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelState } from "../components/cancel-state";
import { ProcessingState } from "../components/processing-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirmDanger(
    "Delete Agent Forever?",
    `This will permanently delete "${data.name}". This action cannot be undone.`,
    "Delete Forever"
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValue={data}
      />
      <div className="flex-1 py-3 px-4 md:px-6 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name || ""}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && (
          <div className="text-red-500"><CancelState /></div>
        )}
        {isCompleted && (
          <div className="text-gray-500">Meeting has been completed</div>
        )}
        {isProcessing && (
          <div className="text-yellow-500"><ProcessingState /></div>
        )}
        {isActive && (
          <ActiveState meetingId={meetingId} />
        )}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {/* Meeting details and content would go here */}
      </div>
    </>
  );
};

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
