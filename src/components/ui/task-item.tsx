"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  id: string
  title: string
  completed: boolean
  onToggle?: (id: string, completed: boolean) => void
  className?: string
}

const TaskItem = React.forwardRef<HTMLDivElement, TaskItemProps>(
  ({ id, title, completed, onToggle, className, ...props }, ref) => {
    const handleToggle = () => {
      onToggle?.(id, !completed)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-muted/50 cursor-pointer group",
          completed && "opacity-60",
          className
        )}
        onClick={handleToggle}
        {...props}
      >
        <div
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
            completed
              ? "bg-success border-success text-success-foreground"
              : "border-border group-hover:border-primary"
          )}
        >
          {completed && <Check className="w-3 h-3" />}
        </div>
        
        <span
          className={cn(
            "text-sm transition-all duration-200 select-none",
            completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          )}
        >
          {title}
        </span>
      </div>
    )
  }
)

TaskItem.displayName = "TaskItem"

export { TaskItem }