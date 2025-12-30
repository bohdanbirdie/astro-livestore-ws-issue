import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  count: number;
  onClick: () => void;
  className?: string;
}

export function LikeButton({ count, onClick, className }: LikeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-card-bg hover:bg-card-bg/80 border border-border-primary",
        "transition-all duration-200 ease-out",
        "hover:scale-105 active:scale-95 cursor-pointer",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-5 transition-all duration-200",
          "text-red-500 group-hover:fill-red-500",
          count > 0 && "fill-red-500",
        )}
      />
      <span className="text-sm font-medium text-primary-text">{count}</span>
    </button>
  );
}
