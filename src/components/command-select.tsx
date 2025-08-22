import { ReactNode, useState } from "react";

import { Button } from "./ui/button";

import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;

  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder: string;
  isSearchable?: boolean;
  className?: string;
}
const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  className,
  placeholder = "Select An Option",
  isSearchable,
}: Props) => {
  const [open, seOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  return (
    <>
      <Button
      type="button"
      variant="elevated"
      className={cn("h-9 justify-between font-normal px-2",!selectedOption && "text-muted-foreground",className)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon/>
      </Button>
    </>
  );
};

export default CommandSelect;
