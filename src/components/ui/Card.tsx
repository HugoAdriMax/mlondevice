"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  gradient = false,
}: CardProps) {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? { y: -5, borderColor: "rgba(255,255,255,0.2)" } : {}}
      transition={{ duration: 0.3 }}
    >
      {gradient && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
