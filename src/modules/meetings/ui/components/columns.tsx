"use client";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { ColumnDef } from "@tanstack/react-table";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CircleXIcon,
  CircleCheckIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MeetingGetMany } from "../../types";
import { cn } from "@/lib/utils";

function formatDuration(second: number) {
  return humanizeDuration(second * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  active: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  processing: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-2 py-1">
        <span className="font-semibold capitalize text-gray-900 hover:text-blue-600 transition-colors duration-200">
          {row.original.name}
        </span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2 bg-gray-50 rounded-lg px-2 py-1 hover:bg-gray-100 transition-colors duration-200">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
            <GeneratedAvatar
              seed={row.original.agent.name}
              variant="botttsNeutral"
              className="size-4 hover:scale-110 transition-transform duration-200"
            />
          </div>
          {row.original.startedAt && (
            <span className="text-sm text-muted-foreground bg-blue-50 px-2 py-1 rounded-md">
              {format(row.original.startedAt, "MMM d")}
            </span>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap];
      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize text-sm font-medium px-3 py-1.5 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              "mr-2 w-4 h-4",
              row.original.status === "processing" && "animate-spin",
              row.original.status === "active" && "animate-pulse"
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="capitalize text-sm font-medium px-3 py-1.5 bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-sm"
      >
        <ClockFadingIcon className="mr-2 w-4 h-4" />
        {row.original.duration ? formatDuration(row.original.duration) : "No Duration"}
      </Badge>
    ),
  },
];