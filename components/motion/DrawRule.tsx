import type { ComponentPropsWithoutRef, CSSProperties } from "react";

type RuleStyle = CSSProperties & { "--reveal-origin"?: string };

export function DrawRule({ style, ...props }: ComponentPropsWithoutRef<"span">) {
  const motionStyle: RuleStyle = { ...style, "--reveal-origin": "left" };
  return <span aria-hidden="true" data-reveal="rule" style={motionStyle} {...props} />;
}
