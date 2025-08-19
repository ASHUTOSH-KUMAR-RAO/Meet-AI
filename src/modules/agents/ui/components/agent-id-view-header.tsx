import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
  MoreVertical,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
  agentId: String;
  agentName: string;
  onRemove: () => void;
  onEdit: () => void;
}

const AgentIdViewHeader = ({ agentId, agentName, onRemove, onEdit }: Props) => {
  return (
    <div className="flex items-center justify-between py-4 px-2">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30 shadow-sm">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink 
                asChild 
                className="font-medium text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
              >
                <Link href="/agents">
                  <HomeIcon className="size-4 group-hover:scale-110 transition-transform duration-200" />
                  My Agents
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator>
              <div className="p-1 rounded-full bg-gray-200">
                <ChevronRightIcon className="size-4 text-gray-500" />
              </div>
            </BreadcrumbSeparator>
            
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                <Link href={`/agents/${agentId}`}>
                  {agentName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Enhanced Dropdown Menu */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/30">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="elevated" 
              className="h-12 w-12 rounded-xl hover:bg-white/80 hover:shadow-md transition-all duration-200 group"
            >
              <MoreVertical className="size-5 text-gray-600 group-hover:text-gray-800 group-hover:scale-110 transition-all duration-200" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="bg-white/95 backdrop-blur-sm border border-white/30 shadow-xl rounded-xl p-2 min-w-[160px]"
          >
            <DropdownMenuItem 
              onClick={onEdit}
              className="rounded-lg px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                  <PencilIcon className="size-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-blue-700">
                  Edit Agent
                </span>
              </div>
            </DropdownMenuItem>
            
            <div className="h-px bg-gray-200 my-1"></div>
            
            <DropdownMenuItem 
              onClick={onRemove}
              className="rounded-lg px-3 py-2.5 cursor-pointer hover:bg-red-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                  <TrashIcon className="size-4 text-red-600" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-red-700">
                  Remove Agent
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AgentIdViewHeader;