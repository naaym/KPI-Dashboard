"use client"

import * as React from "react"
import { Calendar, Target, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProgressBar } from "./progress-bar"
import { DonutChart } from "./donut-chart"
import { TaskItem } from "./task-item"
import { Badge } from "./badge"

export interface Task {
  id: string
  title: string
  completed: boolean
}

export interface ObjectiveCardProps {
  id: string
  title: string
  kpi: string
  kpiTarget: string
  progress: number
  status: "not-started" | "in-progress" | "completed"
  tasks: Task[]
  dueDate?: string
  assignee?: string
  priority?: "low" | "medium" | "high"
  className?: string
  onTaskToggle?: (objectiveId: string, taskId: string, completed: boolean) => void
  onCardClick?: (id: string) => void
}

const statusVariants = {
  "not-started": "status-not-started",
  "in-progress": "status-in-progress", 
  "completed": "status-completed"
}

const statusLabels = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "completed": "Completed"
}

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-danger/10 text-danger border-danger/20"
}

const ObjectiveCard = React.forwardRef<HTMLDivElement, ObjectiveCardProps>(
  ({ 
    id,
    title, 
    kpi, 
    kpiTarget, 
    progress, 
    status, 
    tasks, 
    dueDate, 
    assignee,
    priority = "medium",
    className,
    onTaskToggle,
    onCardClick,
    ...props 
  }, ref) => {
    const completedTasks = tasks.filter(task => task.completed).length
    const taskProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0
    
    const handleTaskToggle = (taskId: string, completed: boolean) => {
      onTaskToggle?.(id, taskId, completed)
    }
    
    const handleCardClick = () => {
      onCardClick?.(id)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card/80 backdrop-blur-md border border-border/50 rounded-xl shadow-md interactive p-6 cursor-pointer group animate-slide-up",
          className
        )}
        onClick={handleCardClick}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-h3 font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="status-completed">
                <Target className="w-3 h-3 mr-1" />
                {kpi}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                kpiFormula: {kpiTarget}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 ml-4">
            <Badge 
              variant="outline" 
              className={cn(
                "border-current/20",
                statusVariants[status]
              )}
            >
              {statusLabels[status]}
            </Badge>
            {priority && (
              <Badge 
                variant="outline" 
                className={cn("border-current/20 text-xs", priorityColors[priority])}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Badge>
            )}
          </div>
        </div>
        
        {/* KPI Progress Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">KPI Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <ProgressBar 
              value={progress} 
              size="sm" 
              variant={status === "completed" ? "success" : status === "in-progress" ? "warning" : "default"}
            />
          </div>
          
          <div className="ml-6">
            <DonutChart 
              value={progress} 
              size={80}
              strokeWidth={8}
              variant={status === "completed" ? "success" : status === "in-progress" ? "warning" : "default"}
            />
          </div>
        </div>
        
        {/* Tasks Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Tasks</span>
            <span className="text-xs text-muted-foreground">
              {completedTasks}/{tasks.length} completed
            </span>
          </div>
          
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {tasks.slice(0, 3).map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                completed={task.completed}
                onToggle={handleTaskToggle}
              />
            ))}
            {tasks.length > 3 && (
              <div className="text-xs text-muted-foreground text-center py-2">
                +{tasks.length - 3} more tasks
              </div>
            )}
          </div>
          
          {tasks.length > 0 && (
            <ProgressBar 
              value={taskProgress} 
              size="sm" 
              variant="default"
              className="mt-3"
            />
          )}
        </div>
        
        {/* Footer */}
        {(dueDate || assignee) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            {dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {dueDate}
              </div>
            )}
            {assignee && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                {assignee}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

ObjectiveCard.displayName = "ObjectiveCard"

export { ObjectiveCard }