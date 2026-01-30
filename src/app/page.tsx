"use client"

import * as React from "react"
import { Search, Bell, Settings, Menu, X, Plus, Filter, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ObjectiveCard, type Task } from "@/components/ui/objective-card"
import { FilterSidebar, type FilterState } from "@/components/ui/filter-sidebar"
import { MiniChart } from "@/components/ui/mini-chart"
import { SkeletonCard, SkeletonMiniChart } from "@/components/ui/skeleton-card"
import { ErrorState, LoadingState } from "@/components/ui/states"
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"

// Mock data for objectives
const mockObjectives = [
  {
    id: "1",
    title: "nessi w a7bebi jemla w bel 7amlaa",
    kpi: "Customer Satisfaction",
    kpiTarget: "85% satisfaction rate",
    progress: 72,
    status: "in-progress" as const,
    priority: "high" as const,
    dueDate: "2024-03-15",
    assignee: "Sarah Chen",
    tasks: [
      { id: "1-1", title: "Implement customer feedback system", completed: true },
      { id: "1-2", title: "Train support team on new protocols", completed: true },
      { id: "1-3", title: "Launch satisfaction survey campaign", completed: false },
      { id: "1-4", title: "Analyze Q1 feedback data", completed: false },
    ]
  },
  {
    id: "2", 
    title: "Increase Revenue Growth Rate",
    kpi: "Revenue Growth",
    kpiTarget: "20% YoY growth",
    progress: 85,
    status: "in-progress" as const,
    priority: "high" as const,
    dueDate: "2024-04-30",
    assignee: "Mike Johnson",
    tasks: [
      { id: "2-1", title: "Expand enterprise sales team", completed: true },
      { id: "2-2", title: "Launch new pricing tiers", completed: true },
      { id: "2-3", title: "Optimize conversion funnel", completed: true },
      { id: "2-4", title: "Q2 revenue planning", completed: false },
    ]
  },
  {
    id: "3",
    title: "Improve User Engagement Metrics", 
    kpi: "User Engagement",
    kpiTarget: "75% daily active users",
    progress: 45,
    status: "in-progress" as const,
    priority: "medium" as const,
    dueDate: "2024-03-31",
    assignee: "Emily Davis",
    tasks: [
      { id: "3-1", title: "Redesign onboarding flow", completed: true },
      { id: "3-2", title: "Implement gamification features", completed: false },
      { id: "3-3", title: "Launch referral program", completed: false },
    ]
  },
  {
    id: "4",
    title: "Optimize Operational Efficiency",
    kpi: "Operational Efficiency", 
    kpiTarget: "30% cost reduction",
    progress: 100,
    status: "completed" as const,
    priority: "medium" as const,
    dueDate: "2024-02-28",
    assignee: "David Kim",
    tasks: [
      { id: "4-1", title: "Automate manual processes", completed: true },
      { id: "4-2", title: "Implement new workflow system", completed: true },
      { id: "4-3", title: "Train staff on new tools", completed: true },
    ]
  },
  {
    id: "5",
    title: "Launch Quality Management System",
    kpi: "Quality Metrics",
    kpiTarget: "95% quality score",
    progress: 0,
    status: "not-started" as const,
    priority: "low" as const,
    dueDate: "2024-06-30",
    assignee: "Lisa Wang",
    tasks: [
      { id: "5-1", title: "Research quality frameworks", completed: false },
      { id: "5-2", title: "Select QMS software", completed: false },
      { id: "5-3", title: "Develop quality standards", completed: false },
    ]
  },
  {
    id: "6",
    title: "Drive Innovation Index",
    kpi: "Innovation Index",
    kpiTarget: "40 innovation projects",
    progress: 60,
    status: "in-progress" as const,
    priority: "medium" as const,
    dueDate: "2024-05-15",
    assignee: "Tom Wilson",
    tasks: [
      { id: "6-1", title: "Establish innovation lab", completed: true },
      { id: "6-2", title: "Launch idea submission platform", completed: true },
      { id: "6-3", title: "Host innovation workshop", completed: false },
      { id: "6-4", title: "Evaluate Q1 submissions", completed: false },
    ]
  }
]

// Mock analytics data
const analyticsData = {
  totalObjectives: mockObjectives.length,
  completedObjectives: mockObjectives.filter(obj => obj.status === "completed").length,
  averageProgress: Math.round(mockObjectives.reduce((acc, obj) => acc + obj.progress, 0) / mockObjectives.length),
  totalTasks: mockObjectives.reduce((acc, obj) => acc + obj.tasks.length, 0),
  completedTasks: mockObjectives.reduce((acc, obj) => 
    acc + obj.tasks.filter(task => task.completed).length, 0
  ),
  progressTrend: [65, 68, 72, 70, 75, 78],
  completionTrend: [2, 3, 3, 4, 4, 4],
  taskTrend: [45, 52, 58, 61, 67, 72]
}

export default function ObjectiveEvaluationDashboard() {
  const [objectives, setObjectives] = React.useState(mockObjectives)
  const [filteredObjectives, setFilteredObjectives] = React.useState(mockObjectives)
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    kpiTypes: [],
    progressRange: [0, 100],
    statuses: [],
    sortBy: "alphabetical",
    sortOrder: "asc"
  })
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [toasts, setToasts] = React.useState<Array<{id: string, message: string, type: 'success' | 'error' | 'info'}>>([])
  
  // Simulate initial loading
  React.useEffect(() => {
    setIsLoading(true)
    setError(null)
    
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Uncomment to test error state
      // setError("Failed to load objectives")
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Apply filters and sorting
  React.useEffect(() => {
    let filtered = [...objectives]
    
    // Apply search filter
    if (filters.search || searchQuery) {
      const query = (filters.search || searchQuery).toLowerCase()
      filtered = filtered.filter(obj => 
        obj.title.toLowerCase().includes(query) ||
        obj.kpi.toLowerCase().includes(query) ||
        obj.assignee?.toLowerCase().includes(query)
      )
    }
    
    // Apply KPI type filter
    if (filters.kpiTypes.length > 0) {
      filtered = filtered.filter(obj => filters.kpiTypes.includes(obj.kpi))
    }
    
    // Apply progress range filter
    filtered = filtered.filter(obj => 
      obj.progress >= filters.progressRange[0] && obj.progress <= filters.progressRange[1]
    )
    
    // Apply status filter
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(obj => filters.statuses.includes(obj.status))
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case "alphabetical":
          comparison = a.title.localeCompare(b.title)
          break
        case "progress":
          comparison = a.progress - b.progress
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          break
        case "dueDate":
          comparison = new Date(a.dueDate || "").getTime() - new Date(b.dueDate || "").getTime()
          break
      }
      
      return filters.sortOrder === "desc" ? -comparison : comparison
    })
    
    setFilteredObjectives(filtered)
  }, [objectives, filters, searchQuery])
  
  const handleTaskToggle = (objectiveId: string, taskId: string, completed: boolean) => {
    // Update local state
    setObjectives(prev => prev.map(obj => {
      if (obj.id === objectiveId) {
        return {
          ...obj,
          tasks: obj.tasks.map(task => 
            task.id === taskId ? { ...task, completed } : task
          )
        }
      }
      return obj
    }))
    
    // Show toast notification
    addToast(`Task ${completed ? 'completed' : 'reopened'}`, 'success')
    
    // In a real app, this would update the backend
    console.log(`Task ${taskId} in objective ${objectiveId} marked as ${completed}`)
  }
  
  const handleCardClick = (objectiveId: string) => {
    addToast(`Opening objective details...`, 'info')
    // In a real app, this would navigate to objective details
    console.log(`Clicked objective ${objectiveId}`)
  }
  
  const handleRefresh = () => {
    setIsLoading(true)
    setError(null)
    
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false)
      addToast('Data refreshed successfully', 'success')
    }, 1000)
  }
  
  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">OE</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">Objective Evaluation Dashboard</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </header>
        
        <main className="flex-1 flex items-center justify-center">
          <ErrorState 
            variant="general"
            onRetry={handleRefresh}
          />
        </main>
      </div>
    )
  }
  
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Navigation */}
        <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile menu trigger */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">OE</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">Objective Evaluation Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search bar (hidden on mobile) */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search objectives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Refresh button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
              </Button>
              
              {/* Action buttons */}
              <Button size="sm" className="btn-premium">
                <Plus className="w-4 h-4 mr-2" />
                New Objective
              </Button>
              
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
            />
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {isLoading ? (
                <>
                  {/* Loading skeleton for analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                      <SkeletonMiniChart key={i} />
                    ))}
                  </div>
                  
                  {/* Loading skeleton for objectives */}
                  <div className="space-y-4">
                    <div className="h-8 bg-muted rounded w-48 animate-shimmer" />
                    <div className="h-4 bg-muted rounded w-64 animate-shimmer" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Header Summary Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <MiniChart
                      data={analyticsData.progressTrend}
                      trend="up"
                      label="Avg Progress"
                      value={`${analyticsData.averageProgress}%`}
                      change="+5%"
                      color="primary"
                    />
                    
                    <MiniChart
                      data={analyticsData.completionTrend}
                      trend="up"
                      label="Completed"
                      value={`${analyticsData.completedObjectives}/${analyticsData.totalObjectives}`}
                      change="+1 this week"
                      color="success"
                      variant="bar"
                    />
                    
                    <MiniChart
                      data={analyticsData.taskTrend}
                      trend="up"
                      label="Task Progress"
                      value={`${analyticsData.completedTasks}/${analyticsData.totalTasks}`}
                      change="+8%"
                      color="warning"
                    />
                    
                    <MiniChart
                      data={[70, 75, 72, 78, 82, 85]}
                      trend="up"
                      label="KPI Score"
                      value="85%"
                      change="+3%"
                      color="primary"
                    />
                  </div>
                  
                  {/* Objectives Grid */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Objectives & Key Results
                      </h2>
                      <p className="text-muted-foreground">
                        Showing {filteredObjectives.length} of {objectives.length} objectives
                      </p>
                    </div>
                    
                    {/* Mobile search */}
                    <div className="md:hidden relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-48"
                      />
                    </div>
                  </div>
                  
                  {/* Objectives Grid */}
                  {filteredObjectives.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredObjectives.map((objective, index) => (
                        <div
                          key={objective.id}
                          className="animate-slide-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ObjectiveCard
                            {...objective}
                            onTaskToggle={handleTaskToggle}
                            onCardClick={handleCardClick}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Filter className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No objectives found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search criteria
                      </p>
                      <Button variant="outline" onClick={() => setFilters({
                        search: "",
                        kpiTypes: [],
                        progressRange: [0, 100],
                        statuses: [],
                        sortBy: "alphabetical",
                        sortOrder: "asc"
                      })}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <ToastViewport />
      {toasts.map((toast) => (
        <Toast key={toast.id} className={cn(
          "animate-slide-in",
          toast.type === 'success' && "border-success",
          toast.type === 'error' && "border-danger",
          toast.type === 'info' && "border-info"
        )}>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              toast.type === 'success' && "bg-success",
              toast.type === 'error' && "bg-danger", 
              toast.type === 'info' && "bg-info"
            )} />
            <p className="text-sm">{toast.message}</p>
          </div>
        </Toast>
      ))}
    </ToastProvider>
  )
}