// How Can We Use trpc Here :- or tenstack query


"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export const HomeView = () => {
  const trpc = useTRPC() // Basically useTRPC is a Hool of type trpc
  const {data}  = useQuery(trpc.hello.queryOptions({text:"Ashutosh Kumar Rao"}))
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     {data?.greeting}
    </div>
  );
};

