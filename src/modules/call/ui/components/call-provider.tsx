"use client";

import { LoaderIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { GeneratedAvatar } from "@/lib/avatar";
import { CallConnect } from "./call-connet";



interface Props {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="animate-spin h-6 w-6 text-white" />
      </div>
    );
  }

  return (
    <div>
      <CallConnect
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userName={data.user.name}
        userImage={
          data.user.image ??
          GeneratedAvatar({ seed: data.user.name, variant: "initials" })
        }
      />
    </div>
  );
};
