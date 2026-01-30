"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DonutChartProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  className?: string
  showLabel?: boolean
  label?: string
  variant?: "default" | "success" | "warning" | "danger"
}

const DonutChart = React.forwardRef<SVGSVGElement, DonutChartProps>(
  ({ 
    value, 
    max = 100, 
    size = 120, 
    strokeWidth = 12, 
    className, 
    showLabel = true, 
    label,
    variant = "default",
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    
    const variantColors = {
      default: "url(#gradient-primary)",
      success: "var(--success)",
      warning: "var(--warning)",
      danger: "var(--danger)"
    }
    
    const center = size / 2
    
    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        <svg
          ref={ref}
          width={size}
          height={size}
          className="transform -rotate-90"
          {...props}
        >
          <defs>
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="var(--muted)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={variantColors[variant]}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold gradient-text">{Math.round(percentage)}%</span>
            {label && (
              <span className="text-xs text-muted-foreground mt-1">{label}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)

DonutChart.displayName = "DonutChart"

export { DonutChart }