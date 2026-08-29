import Link from "next/link";
import { navigation, siteSettings } from "@/content/site";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Logo darkSurface />
          <p>Architecture and interiors shaped around everyday use.</p>
        </div>
        <div>
          <p className={styles.label}>Navigate</p>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className={styles.label}>Contact</p>
          <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
          <a href={`tel:${siteSettings.phoneHref}`}>{siteSettings.phoneDisplay}</a>
          <p>Thoothukudi, Tamil Nadu</p>
        </div>
      </div>
      <div className={styles.legal}>
        <span>© {new Date().getFullYear()} Paper Brick Architects</span>
        <span>Architecture + Interiors</span>
      </div>
    </footer>
  );
}
