"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/content/services";
import styles from "./HomeServices.module.css";

export function HomeServices() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.services} aria-labelledby="services-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className="mono-label" data-reveal="text">What we do</p>
          <h2 id="services-title" data-reveal="text">Services</h2>
        </div>
        <div className={styles.composition}>
          <ol className={styles.index}>
            {services.map((service, index) => (
              <li key={service.id} className={active === index ? styles.active : ""} data-reveal="section">
                <Link
                  href={`/services#${service.id}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className={styles.number}>{service.number}</span>
                  <span className={styles.serviceTitle}>{service.title}</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                  <span className={styles.description}>{service.copy}</span>
                </Link>
                <div className={styles.mobileImage} data-reveal="image">
                  <Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} sizes="100vw" />
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.preview} aria-live="polite">
            {services.map((service, index) => (
              <div key={service.id} className={`${styles.previewFrame} ${active === index ? styles.previewActive : ""}`} aria-hidden={active !== index}>
                <Image src={service.image.src} alt={active === index ? service.image.alt : ""} fill sizes="45vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
