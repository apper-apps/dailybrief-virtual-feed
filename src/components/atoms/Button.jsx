import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-secondary to-secondary hover:from-secondary hover:to-error text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white",
    accent: "bg-gradient-to-r from-accent to-info text-white shadow-lg hover:shadow-xl",
    ghost: "text-primary hover:bg-gray-100",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-accent hover:text-accent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;