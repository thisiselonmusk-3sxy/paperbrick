import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./motion.module.css";

export function MotionLink({ children, className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link className={`${styles.motionLink} ${className}`} {...props}>
      <span>{children}</span>
    </Link>
  );
}
