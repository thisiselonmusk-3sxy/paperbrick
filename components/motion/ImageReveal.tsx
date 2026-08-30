import type { ComponentPropsWithoutRef, CSSProperties } from "react";

type MotionStyle = CSSProperties & { "--reveal-origin"?: string; "--parallax-strength"?: string };

type ImageRevealProps = ComponentPropsWithoutRef<"div"> & {
  origin?: "left" | "right" | "top" | "bottom";
  parallax?: boolean;
  parallaxStrength?: number;
};

export function ImageReveal({ children, origin = "left", parallax = false, parallaxStrength = 18, style, ...props }: ImageRevealProps) {
  const motionStyle: MotionStyle = {
    ...style,
    "--reveal-origin": origin,
    "--parallax-strength": String(parallaxStrength),
  };
  return (
    <div data-reveal="image" data-reveal-origin={origin} data-parallax={parallax ? "subtle" : undefined} style={motionStyle} {...props}>
      {children}
    </div>
  );
}
