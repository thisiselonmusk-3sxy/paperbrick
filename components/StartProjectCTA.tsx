"use client";

import { makeWhatsAppUrl, siteSettings } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "./ButtonLink";
import styles from "./StartProjectCTA.module.css";

export function StartProjectCTA({ sourcePage }: { sourcePage: string }) {
  return (
    <section className={styles.cta} aria-labelledby="start-project-title" data-reveal="section">
      <span className={styles.surface} aria-hidden="true" />
      <div className={styles.inner}>
        <p className="mono-label" data-reveal="text">Project enquiry</p>
        <h2 id="start-project-title" data-reveal="text">Start a project</h2>
        <p className={styles.copy} data-reveal="text">Tell us about your site, brief, or interior.</p>
        <div className={styles.actions} data-reveal="stagger">
          <ButtonLink
            href={makeWhatsAppUrl()}
            dark
            external
            onClick={() => trackEvent({ name: "click_whatsapp", sourcePage })}
          >
            WhatsApp
          </ButtonLink>
          <ButtonLink href="/contact">Project enquiry</ButtonLink>
          <a
            href={`mailto:${siteSettings.email}`}
            className={styles.textLink}
            onClick={() => trackEvent({ name: "click_email", sourcePage })}
          >
            {siteSettings.email}
          </a>
        </div>
      </div>
    </section>
  );
}
