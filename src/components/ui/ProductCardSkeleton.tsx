interface ProductCardSkeletonProps {
  variant?: "highlight" | "compact"
}

export default function ProductCardSkeleton({
  variant = "compact",
}: ProductCardSkeletonProps) {
  const isHighlight = variant === "highlight"

  return (
    <div
      className="receipt-card p-3 animate-pulse"
      style={{
        clipPath:
          "polygon(10px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 10px)",
      }}
    >
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-border-color z-20" />
      <div>
        <div
          className={`w-full border border-border-color mb-3 ${isHighlight ? "h-48" : "h-32"} bg-muted`}
        />
        {isHighlight && (
          <div className="h-3 bg-muted w-1/4 mb-2 rounded" />
        )}
        <div
          className={`h-4 bg-muted rounded ${isHighlight ? "w-3/4" : "w-2/3"}`}
        />
      </div>
      <div className="mt-3 pt-3 border-t border-dashed border-border-color space-y-2">
        <div className="h-6 bg-muted rounded w-1/3" />
        <div className="h-8 bg-muted rounded w-full" />
      </div>
    </div>
  )
}
