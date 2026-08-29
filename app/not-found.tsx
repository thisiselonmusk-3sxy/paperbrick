import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <p className="mono-label">404 / Not found</p>
        <h1>This page is not part of the archive.</h1>
        <Link href="/work">View all work →</Link>
      </main>
      <SiteFooter />
    </>
  );
}
