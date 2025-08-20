"use client";

interface Props {
  agentId: string;
}

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import AgentIdViewHeader from "../components/agent-id-view-header";
import React, { useState } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, CalendarIcon, UserIcon, FileTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirmDanger } from "../../hooks/use-confirm";
import UpdateAgentDialog from "../components/update-agent-dialog";

const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirmDanger(
    "Delete Agent Forever?",
    `This will permanently delete "${data.name}" and remove ${data.meetingCount} associated meeting${data.meetingCount !== 1 ? 's' : ''}. This action cannot be undone.`,
    "Delete Forever"
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  // YE FUNCTION ADD KIYA HAI - Edit button ke liye
  const handleEditAgent = () => {
    setUpdateAgentDialogOpen(true);
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValue={data}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="flex-1 py-6 px-4 md:px-8 flex flex-col gap-y-6 max-w-6xl mx-auto">
          <AgentIdViewHeader
            agentId={agentId}
            agentName={data.name}
            onEdit={handleEditAgent} // YE CHANGE KIYA HAI - proper function pass kiya
            onRemove={handleRemoveAgent}
          />

          {/* Main Agent Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="p-8">
              {/* Agent Header Section */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <GeneratedAvatar
                      variant="botttsNeutral"
                      seed={data.name}
                      className="size-16 ring-4 ring-blue-100 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                      <div className="size-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                      {data.name}
                    </h1>
                    <p className="text-gray-500 font-medium">AI Agent</p>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 text-pink-700 hover:from-pink-100 hover:to-rose-100 transition-all duration-200"
                  >
                    <VideoIcon className="size-4" />
                    <span className="font-semibold">{data.meetingCount}</span>
                    <span>
                      {data.meetingCount === 1 ? "Meeting" : "Meetings"}
                    </span>
                  </Badge>

                  <Badge
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700"
                  >
                    <UserIcon className="size-4" />
                    <span>Active</span>
                  </Badge>
                </div>
              </div>

              {/* Instructions Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                    <FileTextIcon className="size-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Instructions
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                    {data.instruction}
                  </p>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <CalendarIcon className="size-6 text-green-600" />
                    <h3 className="font-semibold text-green-800">
                      Recent Activity
                    </h3>
                  </div>
                  <p className="text-green-700">Last meeting: Active today</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <UserIcon className="size-6 text-purple-600" />
                    <h3 className="font-semibold text-purple-800">Status</h3>
                  </div>
                  <p className="text-purple-700">Ready for interactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdViewLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Loading Agent...
          </h3>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      </div>
    </div>
  );
};

export const AgentsIdViewError = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto p-8">
        <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="size-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-red-800">Access Denied</h3>
          <p className="text-red-600">
            You don't have permission to access this agent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentIdView;