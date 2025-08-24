import { EmptyState } from "@/components/empty-state";



export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-center px-4 py-5 gap-y-4">
      <EmptyState
        image="/processing.svg"
        title="Meeting Completed"
        description="This meeting has been completed and is being processed. The summary will be available shortly."
      />
    </div>
  );
};
