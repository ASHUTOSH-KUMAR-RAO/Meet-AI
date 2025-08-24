import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon, BanIcon } from "lucide-react";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-center px-4 py-5 gap-y-4">
      <EmptyState
        image="/upcoming.svg"
        title="No Started Yet"
        description="Once you start this meeting ,a summary will be generated here."
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          variant="elevated"
          className="w-full lg:w-auto text-blue-400"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon />
          <span>Cancel Meeting</span>
        </Button>
        <Button
          disabled={isCancelling}
          variant="elevated"
          asChild
          className="w-full lg:w-auto text-blue-400"
        >
          <Link prefetch href={`/call/${meetingId}`}>
            <VideoIcon />
            <span>Start Meeting</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
