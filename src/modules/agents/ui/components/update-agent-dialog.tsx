import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue:AgentGetOne
}

const UpdateAgentDialog = ({ open, onOpenChange,initialValue }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Agents"
      description="Edit the agents details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
      onSuccess={()=>onOpenChange(false)}
      onCancel={()=>onOpenChange(false)}
      initialValue={initialValue}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
