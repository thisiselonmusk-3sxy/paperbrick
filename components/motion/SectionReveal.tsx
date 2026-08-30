import type { ComponentPropsWithoutRef } from "react";

export function SectionReveal({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div data-reveal="section" {...props}>{children}</div>;
}
