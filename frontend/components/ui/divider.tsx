"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const Divider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn(
      "w-full border-t border-white/5 my-8",
      className
    )}
    {...props}
  />
))
Divider.displayName = "Divider"

export { Divider }
