import { AlertTriangle, RefreshCw } from "lucide-react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  onRetry?: () => void;
  retryText?: string;
  variant?: "empty" | "no-data" | "search";
  className?: string;
  imageSize?: "sm" | "md" | "lg";
}

export const EmptyState = ({
  title,
  description,
  onRetry,
  retryText = "Try Again",
  variant = "empty",
  className = "",
  imageSize = "md"
}: Props) => {
  // Image dimensions based on size
  const imageDimensions = {
    sm: { width: 180, height: 180 },
    md: { width: 240, height: 240 },
    lg: { width: 300, height: 300 }
  };

  // Variant-based styling for empty states
  const variantStyles = {
    empty: {
      buttonBg: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200"
    },
    "no-data": {
      buttonBg: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
      iconColor: "text-green-500",
      borderColor: "border-green-200"
    },
    search: {
      buttonBg: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-500",
      iconColor: "text-purple-500",
      borderColor: "border-purple-200"
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {/* Image with optional overlay */}
      <div className="relative mb-8">
        <Image 
          src="/empty.svg" 
          alt="Empty state illustration" 
          width={imageDimensions[imageSize].width}
          height={imageDimensions[imageSize].height}
          className="opacity-80"
          priority
        />
        
        {/* Optional decorative accent */}
        <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-200 rounded-full`}></div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-4 max-w-lg mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action button for empty state */}
      {onRetry && (
        <div className="mt-8">
          <button
            onClick={onRetry}
            className={`
              inline-flex items-center gap-2 px-6 py-3 
              text-sm font-medium text-white 
              ${currentVariant.buttonBg}
              rounded-lg transition-all duration-200 
              focus:outline-none focus:ring-2 ${currentVariant.buttonBg.split(' ')[2]} focus:ring-offset-2
              hover:shadow-lg hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-label={retryText}
          >
            <RefreshCw className="w-4 h-4" />
            {retryText}
          </button>
        </div>
      )}
    </div>
  );
};