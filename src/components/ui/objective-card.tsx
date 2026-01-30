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
  low: "bg-success/10 text-success border-success/20",
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
          "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]",
          className
        )}
        onClick={handleCardClick}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-transparent" />
        <div className="relative space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-3">
              <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="status-completed border-transparent bg-primary/10 text-primary shadow-sm">
                  <Target className="w-3 h-3 mr-1" />
                  {kpi}
                </Badge>
                <Badge variant="outline" className="border-border/60 bg-muted/40 text-xs text-muted-foreground">
                  Target: {kpiTarget}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-2 border-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm",
                  statusVariants[status]
                )}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                {statusLabels[status]}
              </Badge>
              {priority && (
                <Badge
                  variant="outline"
                  className={cn(
                    "border-current/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                    priorityColors[priority]
                  )}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
              )}
            </div>
          </div>

          {/* KPI Progress Section */}
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-border/60 bg-muted/20 p-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">KPI Progress</span>
                <span className="text-sm font-semibold text-foreground">{Math.round(progress)}%</span>
              </div>
              <ProgressBar
                value={progress}
                size="sm"
                variant={status === "completed" ? "success" : status === "in-progress" ? "warning" : "default"}
              />
            </div>

            <div className="rounded-full border border-border/60 bg-background/80 p-3 shadow-sm">
              <DonutChart
                value={progress}
                size={88}
                strokeWidth={9}
                variant={status === "completed" ? "success" : status === "in-progress" ? "warning" : "default"}
              />
            </div>
          </div>

          {/* Tasks Section */}
          <div className="rounded-2xl border border-border/60 bg-muted/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Tasks</span>
              <span className="text-xs text-muted-foreground">
                {completedTasks}/{tasks.length} completed
              </span>
            </div>

            <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
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
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4 text-xs text-muted-foreground">
              {dueDate && (
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1">
                  <Calendar className="w-3 h-3" />
                  {dueDate}
                </div>
              )}
              {assignee && (
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1">
                  <Users className="w-3 h-3" />
                  {assignee}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ObjectiveCard.displayName = "ObjectiveCard"

export { ObjectiveCard }
