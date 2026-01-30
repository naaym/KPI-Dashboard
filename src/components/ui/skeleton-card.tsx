"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card/80 backdrop-blur-md border border-border/50 rounded-xl shadow-md animate-pulse",
          className
        )}
        {...props}
      >
        {/* Header skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="h-6 bg-muted rounded-lg mb-2 w-3/4 animate-shimmer" />
            <div className="flex gap-2">
              <div className="h-5 bg-muted rounded-md w-24 animate-shimmer" />
              <div className="h-5 bg-muted rounded-md w-20 animate-shimmer" />
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <div className="h-6 bg-muted rounded-md w-20 animate-shimmer" />
            <div className="h-5 bg-muted rounded-md w-12 animate-shimmer" />
          </div>
        </div>
        
        {/* KPI Progress skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-muted rounded w-20 animate-shimmer" />
              <div className="h-4 bg-muted rounded w-8 animate-shimmer" />
            </div>
            <div className="h-2 bg-muted rounded-full animate-shimmer" />
          </div>
          <div className="ml-6">
            <div className="w-20 h-20 bg-muted rounded-full animate-shimmer" />
          </div>
        </div>
        
        {/* Tasks skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between mb-3">
            <div className="h-4 bg-muted rounded w-12 animate-shimmer" />
            <div className="h-3 bg-muted rounded w-16 animate-shimmer" />
          </div>
          
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <div className="w-5 h-5 bg-muted rounded animate-shimmer" />
                <div className="h-4 bg-muted rounded flex-1 animate-shimmer" />
              </div>
            ))}
          </div>
          
          <div className="h-2 bg-muted rounded-full mt-3 animate-shimmer" />
        </div>
        
        {/* Footer skeleton */}
        <div className="flex justify-between mt-4 pt-4 border-t border-border/50">
          <div className="h-3 bg-muted rounded w-16 animate-shimmer" />
          <div className="h-3 bg-muted rounded w-20 animate-shimmer" />
        </div>
      </div>
    )
  }
)

SkeletonCard.displayName = "SkeletonCard"

interface SkeletonMiniChartProps {
  className?: string
}

const SkeletonMiniChart = React.forwardRef<HTMLDivElement, SkeletonMiniChartProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card border border-border rounded-xl p-4 animate-pulse",
          className
        )}
        {...props}
      >
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-muted rounded w-16 animate-shimmer" />
          <div className="h-4 bg-muted rounded w-4 animate-shimmer" />
        </div>
        
        <div className="flex justify-between mb-3">
          <div className="h-8 bg-muted rounded w-12 animate-shimmer" />
          <div className="h-4 bg-muted rounded w-8 animate-shimmer" />
        </div>
        
        <div className="w-full h-10 bg-muted rounded-lg animate-shimmer" />
      </div>
    )
  }
)

SkeletonMiniChart.displayName = "SkeletonMiniChart"

export { SkeletonCard, SkeletonMiniChart }