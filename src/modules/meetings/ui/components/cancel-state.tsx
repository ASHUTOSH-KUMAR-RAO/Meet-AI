import { EmptyState } from "@/components/empty-state";



export const CancelState = () => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center justify-center px-4 py-5 gap-y-4">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting Cancelled"
        description="This meeting has been cancelled."
      />
    </div>
  );
};
