"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import NewAgentDialog from "./new-agent-dialog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import { AgentsSearchFilters } from "./agents-search-filters";
import { DEFAULT_PAGE } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      
      {/* Enhanced header with gradient background and subtle animations */}
      <div className="p-4 px-4 md:px-8 flex flex-col gap-y-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
        
        {/* Title section with enhanced styling */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full transition-all duration-300 group-hover:h-10"></div>
            <h5 className="font-semibold text-xl text-gray-800 dark:text-gray-200 transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              My Agents
            </h5>
          </div>
          
          {/* Enhanced New Agent button */}
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 border-0 group"
          >
            <PlusIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
            <span className="font-medium">New Agent</span>
          </Button>
        </div>

        {/* Enhanced filters section */}
        <div className="relative">
          {/* Subtle background for filters */}
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30"></div>
          
          <ScrollArea className="relative">
            <div className="flex items-center gap-x-3 p-4 min-h-[4rem]">
              {/* Search filter with enhanced styling */}
              <div className="transform transition-all duration-200 hover:scale-105 flex-1">
                <AgentsSearchFilters />
              </div>

              {/* Enhanced Clear button with animation */}
              {isAnyFilterModified && (
                <div className="animate-in slide-in-from-right-5 duration-300">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95 group"
                  >
                    <XCircleIcon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
                    <span className="font-medium">Clear</span>
                  </Button>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full" />
          </ScrollArea>
        </div>

        {/* Optional: Search active indicator */}
        {isAnyFilterModified && (
          <div className="flex items-center justify-center animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm text-emerald-600 dark:text-emerald-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Search active</span>
            </div>
          </div>
        )}

        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100/20 to-emerald-100/20 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-full blur-2xl -z-10"></div>
      </div>
    </>
  );
};

export default ListHeader;