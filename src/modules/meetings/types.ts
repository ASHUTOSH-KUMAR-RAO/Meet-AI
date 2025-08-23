
import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/routers/_app";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"]
export type MeetingGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"]

export enum MeetingStatus {
    Upcoming = "upcoming",
    Completed = "completed",
    Active = "active",
    Processing = "processing",
    Cancelled = "cancelled"
}