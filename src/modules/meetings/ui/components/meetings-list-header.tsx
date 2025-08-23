"use client";

import { Button } from "@/components/ui/button";
import { CircleXIcon, PlusIcon } from "lucide-react";
import NewMeetingDialog from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilters } from "./meetings-search-filters";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-Id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

const MeetingListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilters] = useMeetingsFilters();
  const isAnyFilterModified =
    !!filter.status || !!filter.search || !!filter.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      page: DEFAULT_PAGE,
      search: "",
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      
      {/* Enhanced header with gradient background and subtle animations */}
      <div className="p-4 px-4 md:px-8 flex flex-col gap-y-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
        
        {/* Title section with enhanced styling */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full transition-all duration-300 group-hover:h-10"></div>
            <h5 className="font-semibold text-xl text-gray-800 dark:text-gray-200 transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              My Meetings
            </h5>
          </div>
          
          {/* Enhanced New Meeting button */}
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 border-0"
          >
            <PlusIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
            <span className="font-medium">New Meeting</span>
          </Button>
        </div>

        {/* Enhanced filters section */}
        <div className="relative">
          {/* Subtle background for filters */}
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30"></div>
          
          <ScrollArea className="relative">
            <div className="flex items-center gap-x-3 p-4 min-h-[4rem]">
              {/* Filter components with enhanced spacing */}
              <div className="flex items-center gap-x-3 flex-1">
                <div className="transform transition-all duration-200 hover:scale-105">
                  <MeetingsSearchFilters />
                </div>
                <div className="transform transition-all duration-200 hover:scale-105">
                  <StatusFilter />
                </div>
                <div className="transform transition-all duration-200 hover:scale-105">
                  <AgentIdFilter />
                </div>
              </div>

              {/* Enhanced Clear Filters button with animation */}
              {isAnyFilterModified && (
                <div className="animate-in slide-in-from-right-5 duration-300">
                  <Button
                    variant="outline"
                    onClick={onClearFilters}
                    className="ml-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95"
                  >
                    <CircleXIcon className="w-4 h-4 mr-2 transition-transform duration-200 hover:rotate-90" />
                    <span className="font-medium">Clear Filters</span>
                  </Button>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full" />
          </ScrollArea>
        </div>

        {/* Optional: Filter count indicator */}
        {isAnyFilterModified && (
          <div className="flex items-center justify-center animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-x-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-600 dark:text-blue-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Filters applied</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MeetingListHeader;