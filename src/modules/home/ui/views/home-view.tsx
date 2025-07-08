// How Can We Use trpc Here :- or tenstack query


"use client";

import { useTRPC } from "@/trpc/client";
 

export const HomeView = () => {
  const trpc = useTRPC() // Basically useTRPC is a Hool of type trpc
  return (
    <div >
      Home View 
    </div>
  );
};

