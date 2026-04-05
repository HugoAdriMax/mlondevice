"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-neutral-800 text-neutral-300 border-neutral-700",
    success: "bg-green-900/30 text-green-400 border-green-800",
    warning: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
    error: "bg-red-900/30 text-red-400 border-red-800",
    info: "bg-blue-900/30 text-blue-400 border-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
