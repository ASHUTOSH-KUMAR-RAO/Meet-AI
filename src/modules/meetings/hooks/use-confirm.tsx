import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

export type ConfirmType = "default" | "danger" | "success" | "warning" | "info";

export interface ConfirmOptions {
  title: string;
  description: string;
  type?: ConfirmType;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export const useConfirm = (
  titleOrOptions: string | ConfirmOptions,
  description?: string
): [() => JSX.Element, () => Promise<boolean>] => {
  // Handle both old and new API
  const options: ConfirmOptions = typeof titleOrOptions === "string" 
    ? { title: titleOrOptions, description: description || "" }
    : titleOrOptions;

  const {
    title,
    description: desc,
    type = "default",
    confirmText = "Confirm",
    cancelText = "Cancel",
    destructive = false
  } = options;

  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  // Get icon based on type
  const getIcon = () => {
    const iconClass = "size-6 flex-shrink-0";
    switch (type) {
      case "danger":
        return <XCircle className={`${iconClass} text-red-500`} />;
      case "warning":
        return <AlertTriangle className={`${iconClass} text-amber-500`} />;
      case "success":
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case "info":
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <AlertTriangle className={`${iconClass} text-slate-500`} />;
    }
  };

  // Get colors based on type
  const getColors = () => {
    switch (type) {
      case "danger":
        return {
          headerBg: "bg-gradient-to-r from-red-50 to-pink-50",
          iconBg: "bg-red-100",
          border: "border-red-200",
          confirmBtn: destructive ? "destructive" : "default"
        };
      case "warning":
        return {
          headerBg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          iconBg: "bg-amber-100",
          border: "border-amber-200",
          confirmBtn: "default"
        };
      case "success":
        return {
          headerBg: "bg-gradient-to-r from-green-50 to-emerald-50",
          iconBg: "bg-green-100",
          border: "border-green-200",
          confirmBtn: "default"
        };
      case "info":
        return {
          headerBg: "bg-gradient-to-r from-blue-50 to-indigo-50",
          iconBg: "bg-blue-100",
          border: "border-blue-200",
          confirmBtn: "default"
        };
      default:
        return {
          headerBg: "bg-gradient-to-r from-slate-50 to-gray-50",
          iconBg: "bg-slate-100",
          border: "border-slate-200",
          confirmBtn: "default"
        };
    }
  };

  const colors = getColors();

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={(open) => !open && handleCancel()}
      title=""
      description=""
      
    >
      <div className="space-y-6">
        {/* Header with Icon */}
        <div className={`${colors.headerBg} ${colors.border} border rounded-lg p-4`}>
          <div className="flex items-start gap-4">
            <div className={`${colors.iconBg} p-2 rounded-full`}>
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-2 sm:justify-end">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full sm:w-auto min-w-[100px] transition-all duration-200 hover:bg-gray-50"
          >
            {cancelText}
          </Button>
          
          <Button
            onClick={handleConfirm}
            variant={colors.confirmBtn as any}
            className={`w-full sm:w-auto min-w-[100px] transition-all duration-200 ${
              destructive 
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl" 
                : "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl"
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};

// Convenience hooks for specific types
export const useConfirmDanger = (title: string, description: string, confirmText = "Delete") =>
  useConfirm({ title, description, type: "danger", confirmText, destructive: true });

export const useConfirmWarning = (title: string, description: string) =>
  useConfirm({ title, description, type: "warning" });

export const useConfirmSuccess = (title: string, description: string) =>
  useConfirm({ title, description, type: "success" });

export const useConfirmInfo = (title: string, description: string) =>
  useConfirm({ title, description, type: "info" });