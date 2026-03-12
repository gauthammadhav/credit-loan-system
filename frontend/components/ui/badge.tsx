import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#151515] text-white hover:bg-[#151515]/80",
        success:
          "border-transparent bg-[#3AA76D]/10 text-[#3AA76D] hover:bg-[#3AA76D]/20",
        warning:
          "border-transparent bg-[#D9A441]/10 text-[#D9A441] hover:bg-[#D9A441]/20",
        error:
          "border-transparent bg-[#D64545]/10 text-[#D64545] hover:bg-[#D64545]/20",
        outline: "text-white border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
