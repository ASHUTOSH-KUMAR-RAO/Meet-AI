
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  title: string;
  description: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState = ({ 
  title, 
  description, 
  onRetry, 
  retryText = "Try Again" 
}: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm border border-red-200">
        {/* Error icon with pulse animation */}
        <div className="relative">
          <AlertTriangle className="size-8 text-red-500 animate-pulse" />
          <div className="absolute inset-0 size-8 border-2 border-red-200 rounded-full"></div>
        </div>
        
        <div className="flex flex-col gap-y-2 text-center max-w-sm">
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        
        {/* Retry button - only show if onRetry function is provided */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <RefreshCw className="size-4" />
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};