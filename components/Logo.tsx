import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  darkSurface?: boolean;
  priority?: boolean;
};

export function Logo({ darkSurface = false, priority = false }: LogoProps) {
  return (
    <Link href="/" aria-label="Paper Brick Architects home">
      <Image
        src={darkSurface ? "/media/brand/logo-dark.svg" : "/media/brand/logo-light.svg"}
        alt="Paper Brick Architects"
        width={527}
        height={191}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        style={{ width: "104px", height: "auto" }}
      />
    </Link>
  );
}
