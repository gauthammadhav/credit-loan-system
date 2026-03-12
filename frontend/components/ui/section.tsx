import * as React from "react"
import { cn } from "@/lib/utils"

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "py-24 md:py-32 w-full",
      className
    )}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }
