import * as React from "react";

import { cn } from "@/lib/utils";

type CardTitleProps = {
  bold?: boolean;
  left?: boolean;
};

type CardProps = {
  border?: boolean;
  background?: string;
};

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardProps
>(({ className, border = false, background, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg text-card-foreground shadow-sm h-full text-center text-sm md:text-base",
      background || "bg-card",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-3 md:p-5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & CardTitleProps
>(({ className, bold = false, left = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "leading-none",
      bold ? "font-bold tracking-tight" : "font-normal",
      left ? "text-left" : "text-center",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-3 pt-0 md:p-4 md:pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
