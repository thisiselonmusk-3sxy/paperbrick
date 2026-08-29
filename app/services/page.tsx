import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartProjectCTA } from "@/components/StartProjectCTA";
import { projectsBySlug } from "@/content/projects";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Architecture, interior design and integrated architecture-and-interior consultancy by Paper Brick Architects.",
  alternates: { canonical: "/services" },
};

const services = [
  { id: "architecture", number: "01", title: "Architecture", copy: "Architectural consultancy for residential projects, developing the building’s spatial organisation, form and character.", image: projectsBySlug.get("jvk")!.coverImage },
  { id: "interiors", number: "02", title: "Interiors", copy: "Interior design that considers rooms, materials, built-in elements and everyday use as a connected environment.", image: projectsBySlug.get("perumal")!.gallery[5] },
  { id: "integrated", number: "03", title: "Architecture + Interiors", copy: "An integrated approach that carries one spatial and material language from the building shell into its interior spaces.", image: projectsBySlug.get("ramkumar")!.gallery[7] },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <header className={styles.intro}>
          <p className="mono-label">Practice / Services</p>
          <h1>Architecture<br />+ Interiors</h1>
          <p>Two disciplines developed as a continuous spatial language.</p>
        </header>
        <div className={styles.list}>
          {services.map((service, index) => (
            <section key={service.id} id={service.id} className={styles.service}>
              <div className={styles.image}>
                <Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} sizes="(max-width: 767px) 100vw, 55vw" priority={index === 0} />
              </div>
              <div className={styles.copy}>
                <p className="mono-label">{service.number} / Service</p>
                <h2>{service.title}</h2>
                <p>{service.copy}</p>
              </div>
            </section>
          ))}
        </div>
        <StartProjectCTA sourcePage="/services" />
      </main>
      <SiteFooter />
    </>
  );
}
