"use client"

import * as React from "react"
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
  variant?: "network" | "general" | "empty"
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ 
    title = "Something went wrong",
    description = "An error occurred while loading your data. Please try again.",
    onRetry,
    className,
    variant = "general",
    ...props 
  }, ref) => {
    const icons = {
      network: <WifiOff className="w-12 h-12" />,
      general: <AlertTriangle className="w-12 h-12" />,
      empty: <AlertTriangle className="w-12 h-12" />
    }
    
    const defaultTitles = {
      network: "Connection Error",
      general: "Something went wrong", 
      empty: "No Data Available"
    }
    
    const defaultDescriptions = {
      network: "Unable to connect to the server. Please check your internet connection and try again.",
      general: "An error occurred while loading your data. Please try again.",
      empty: "There's no data to display at the moment."
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12 px-6 text-center",
          className
        )}
        {...props}
      >
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 text-muted-foreground">
          {icons[variant]}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title || defaultTitles[variant]}
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-md">
          {description || defaultDescriptions[variant]}
        </p>
        
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    )
  }
)

ErrorState.displayName = "ErrorState"

interface LoadingStateProps {
  title?: string
  description?: string
  className?: string
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ 
    title = "Loading...",
    description = "Please wait while we fetch your data.",
    className,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12 px-6 text-center",
          className
        )}
        {...props}
      >
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground max-w-md">
          {description}
        </p>
      </div>
    )
  }
)

LoadingState.displayName = "LoadingState"

export { ErrorState, LoadingState }