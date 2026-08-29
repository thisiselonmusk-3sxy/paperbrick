import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  dark?: boolean;
  external?: boolean;
  onClick?: () => void;
};

export function ButtonLink({ href, children, dark = false, external = false, onClick }: ButtonLinkProps) {
  const className = `${styles.button} ${dark ? styles.dark : ""}`;
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={className}>{children}</Link>;
}
