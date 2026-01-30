"use client"

import * as React from "react"
import { Search, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Button } from "./button"
import { Badge } from "./badge"
import { Checkbox } from "./checkbox"
import { Slider } from "./slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"

export interface FilterState {
  search: string
  kpiTypes: string[]
  progressRange: [number, number]
  statuses: string[]
  sortBy: "alphabetical" | "progress" | "priority" | "dueDate"
  sortOrder: "asc" | "desc"
}

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableKpiTypes?: string[]
  className?: string
}

const kpiTypeOptions = [
  "Customer Satisfaction",
  "Revenue Growth", 
  "User Engagement",
  "Operational Efficiency",
  "Quality Metrics",
  "Innovation Index",
  "Team Performance",
  "Cost Reduction"
]

const statusOptions = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" }
]

const sortOptions = [
  { value: "alphabetical", label: "Alphabetical" },
  { value: "progress", label: "Progress %" },
  { value: "priority", label: "Priority" },
  { value: "dueDate", label: "Due Date" }
]

const FilterSidebar = React.forwardRef<HTMLDivElement, FilterSidebarProps>(
  ({ filters, onFiltersChange, availableKpiTypes = kpiTypeOptions, className, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(true)
    
    const updateFilters = (updates: Partial<FilterState>) => {
      onFiltersChange({ ...filters, ...updates })
    }
    
    const handleKpiTypeChange = (kpiType: string, checked: boolean) => {
      const newKpiTypes = checked
        ? [...filters.kpiTypes, kpiType]
        : filters.kpiTypes.filter(type => type !== kpiType)
      updateFilters({ kpiTypes: newKpiTypes })
    }
    
    const handleStatusChange = (status: string, checked: boolean) => {
      const newStatuses = checked
        ? [...filters.statuses, status]
        : filters.statuses.filter(s => s !== status)
      updateFilters({ statuses: newStatuses })
    }
    
    const clearAllFilters = () => {
      updateFilters({
        search: "",
        kpiTypes: [],
        progressRange: [0, 100],
        statuses: [],
        sortBy: "alphabetical",
        sortOrder: "desc"
      })
    }
    
    const hasActiveFilters = filters.search || 
      filters.kpiTypes.length > 0 || 
      filters.statuses.length > 0 || 
      (filters.progressRange[0] > 0 || filters.progressRange[1] < 100)
    
    return (
      <div
        ref={ref}
        className={cn(
          "w-80 bg-card border-r border-border h-full overflow-hidden flex flex-col",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3 font-semibold text-foreground">Filters</h2>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search objectives..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Filters Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Sort Options */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
                Sort & Order
                <Filter className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Sort By
                </label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: any) => updateFilters({ sortBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Order
                </label>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value: any) => updateFilters({ sortOrder: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* KPI Type Filter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">KPI Type</h3>
            <div className="space-y-2">
              {availableKpiTypes.map((kpiType) => (
                <div key={kpiType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`kpi-${kpiType}`}
                    checked={filters.kpiTypes.includes(kpiType)}
                    onCheckedChange={(checked) => handleKpiTypeChange(kpiType, checked as boolean)}
                  />
                  <label
                    htmlFor={`kpi-${kpiType}`}
                    className="text-sm text-foreground cursor-pointer flex-1"
                  >
                    {kpiType}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Progress Range Filter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Progress Range: {filters.progressRange[0]}% - {filters.progressRange[1]}%
            </h3>
            <Slider
              value={filters.progressRange}
              onValueChange={(value: [number, number]) => updateFilters({ progressRange: value })}
              max={100}
              min={0}
              step={5}
              className="mt-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Status</h3>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status.value}`}
                    checked={filters.statuses.includes(status.value)}
                    onCheckedChange={(checked) => handleStatusChange(status.value, checked as boolean)}
                  />
                  <label
                    htmlFor={`status-${status.value}`}
                    className="text-sm text-foreground cursor-pointer flex-1"
                  >
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="p-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="text-xs">
                  Search: {filters.search}
                </Badge>
              )}
              {filters.kpiTypes.map((kpiType) => (
                <Badge key={kpiType} variant="secondary" className="text-xs">
                  {kpiType}
                </Badge>
              ))}
              {filters.statuses.map((status) => (
                <Badge key={status} variant="secondary" className="text-xs">
                  {statusOptions.find(s => s.value === status)?.label}
                </Badge>
              ))}
              {(filters.progressRange[0] > 0 || filters.progressRange[1] < 100) && (
                <Badge variant="secondary" className="text-xs">
                  Progress: {filters.progressRange[0]}%-{filters.progressRange[1]}%
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)

FilterSidebar.displayName = "FilterSidebar"

export { FilterSidebar }