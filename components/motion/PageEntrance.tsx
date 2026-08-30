"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./motion.module.css";

export function PageEntrance() {
  const pathname = usePathname();
  const [initialPath] = useState(pathname);
  const variant = pathname === initialPath ? styles.plateInitial : styles.plateRoute;

  return (
    <div key={pathname} className={`${styles.plate} ${variant}`} aria-hidden="true">
      <i className={styles.plateHorizontal} />
      <i className={styles.plateVertical} />
      <span className={styles.plateMark}>PB</span>
    </div>
  );
}
