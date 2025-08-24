import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon, } from "lucide-react";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-center px-4 py-5 gap-y-4">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting in Progress"
        description="Meeting will end once all participants leave the call."
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          variant="elevated"
          asChild
          className="w-full lg:w-auto text-green-400"
        >
          <Link prefetch href={`/call/${meetingId}`}>
            <VideoIcon />
            <span>Join Meeting</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
