"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MiniChartProps {
  data: number[]
  trend?: "up" | "down" | "neutral"
  label: string
  value: string
  change?: string
  className?: string
  variant?: "line" | "bar"
  color?: "primary" | "success" | "warning" | "danger"
}

const MiniChart = React.forwardRef<HTMLDivElement, MiniChartProps>(
  ({ 
    data, 
    trend = "neutral", 
    label, 
    value, 
    change, 
    className,
    variant = "line",
    color = "primary",
    ...props 
  }, ref) => {
    const colorClasses = {
      primary: "var(--primary)",
      success: "var(--success)",
      warning: "var(--warning)",
      danger: "var(--danger)"
    }
    
    const trendIcons = {
      up: <TrendingUp className="w-4 h-4 text-success" />,
      down: <TrendingDown className="w-4 h-4 text-danger" />,
      neutral: <Minus className="w-4 h-4 text-muted-foreground" />
    }
    
    const trendColors = {
      up: "text-success",
      down: "text-danger", 
      neutral: "text-muted-foreground"
    }
    
    const maxValue = Math.max(...data, 1)
    const minValue = Math.min(...data, 0)
    const range = maxValue - minValue || 1
    
    // Create SVG path for line chart
    const createLinePath = () => {
      if (data.length < 2) return ""
      
      const width = 100
      const height = 40
      const padding = 4
      
      const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * (width - 2 * padding) + padding
        const y = height - ((value - minValue) / range) * (height - 2 * padding) - padding
        return `${x},${y}`
      })
      
      return `M ${points.join(" L ")}`
    }
    
    // Create bars for bar chart
    const createBars = () => {
      const width = 100
      const height = 40
      const padding = 4
      const barWidth = (width - 2 * padding) / data.length - 2
      
      return data.map((value, index) => {
        const x = padding + index * (barWidth + 2)
        const barHeight = ((value - minValue) / range) * (height - 2 * padding)
        const y = height - barHeight - padding
        
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill={colorClasses[color]}
            opacity={0.8}
            rx={2}
          />
        )
      })
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 interactive",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">{label}</span>
          {trend && trendIcons[trend]}
        </div>
        
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {change && (
            <span className={cn("text-sm font-medium", trendColors[trend])}>
              {change}
            </span>
          )}
        </div>
        
        <div className="w-full h-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 40"
            className="overflow-visible"
          >
            {variant === "line" ? (
              <path
                d={createLinePath()}
                fill="none"
                stroke={colorClasses[color]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <g>{createBars()}</g>
            )}
          </svg>
        </div>
      </div>
    )
  }
)

MiniChart.displayName = "MiniChart"

export { MiniChart }