import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { makeWhatsAppUrl, siteSettings } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Paper Brick Architects about an architecture or interior design project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <header className={styles.intro}>
          <p className="mono-label">Project enquiry</p>
          <h1>Contact</h1>
          <p>Tell us about your site, location and what you want to build.</p>
        </header>
        <section className={styles.contactGrid} aria-label="Studio contact details">
          <div><p className="mono-label">Phone / WhatsApp</p><a href={`tel:${siteSettings.phoneHref}`}>{siteSettings.phoneDisplay}</a><a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer">Open WhatsApp →</a></div>
          <div><p className="mono-label">Email</p><a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a></div>
          <div><p className="mono-label">Studio</p><p>Thoothukudi, Tamil Nadu</p></div>
        </section>
        <section className={styles.formSection} aria-labelledby="enquiry-title">
          <div className={styles.formHeading}><p className="mono-label">Your project</p><h2 id="enquiry-title">Project details</h2></div>
          <EnquiryForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
