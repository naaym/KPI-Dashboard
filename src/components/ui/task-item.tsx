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
          "flex items-center gap-3 rounded-xl border border-transparent bg-background/70 px-3 py-2 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 cursor-pointer group",
          completed && "border-success/20 bg-success/5",
          className
        )}
        onClick={handleToggle}
        {...props}
      >
        <div
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
            completed
              ? "bg-success text-success-foreground border-success shadow-sm"
              : "border-border group-hover:border-primary"
          )}
        >
          {completed && <Check className="w-3 h-3" />}
        </div>
        
        <span
          className={cn(
            "text-sm font-medium transition-all duration-200 select-none",
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
