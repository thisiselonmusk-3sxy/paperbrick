import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMetadata } from "@/components/ProjectMetadata";
import { ProjectViewTracker } from "@/components/ProjectViewTracker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartProjectCTA } from "@/components/StartProjectCTA";
import { getNextProject, projects, projectsBySlug } from "@/content/projects";
import { SITE_URL } from "@/content/site";
import styles from "./project.module.css";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug.get(slug);
  if (!project) return {};
  const description = `${project.name} in ${project.location}, a ${project.category.toLowerCase()} project by Paper Brick Architects.`;
  return {
    title: `${project.name}, ${project.location}`,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.name} — Paper Brick Architects`,
      description,
      images: [{ url: project.coverImage.src, width: project.coverImage.width, height: project.coverImage.height, alt: project.coverImage.alt }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsBySlug.get(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project);
  const remaining = project.gallery.slice(1);
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 2, name: project.name, item: `${SITE_URL}/work/${project.slug}` },
    ],
  };

  return (
    <>
      <SiteHeader overlay />
      <ProjectViewTracker slug={project.slug} />
      <main id="main-content">
        <section className={styles.hero} data-hero aria-labelledby="project-title">
          <Image src={project.coverImage.src} alt={project.coverImage.alt} fill priority sizes="100vw" className={styles.heroImage} />
          <div className={styles.heroLabel}>
            <span>{project.name}</span><span>{project.location}</span>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.back}><Link href="/work">← All work</Link></div>
          <div className={styles.titleBlock}>
            <p className="mono-label">Project / {String(project.order).padStart(2, "0")}</p>
            <h1 id="project-title">{project.name}</h1>
          </div>
          <ProjectMetadata project={project} />
        </section>

        {project.description && <section className={styles.description}><p>{project.description}</p></section>}

        <section className={styles.gallery} aria-label={`${project.name} project gallery`}>
          {groupGallery(remaining).map((group, groupIndex) => (
            <div key={group[0].src} className={group.length === 1 ? styles.single : styles.pair}>
              {group.map((image, imageIndex) => (
                <Image key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={group.length === 1 ? "100vw" : "(max-width: 767px) 100vw, 50vw"} loading={groupIndex === 0 && imageIndex === 0 ? "eager" : "lazy"} />
              ))}
            </div>
          ))}
        </section>

        <section className={styles.next} aria-labelledby="next-project-title">
          <p className="mono-label">Next project</p>
          <Link href={`/work/${nextProject.slug}`}>
            <Image src={nextProject.coverImage.src} alt="" width={nextProject.coverImage.width} height={nextProject.coverImage.height} sizes="100vw" />
            <div><h2 id="next-project-title">{nextProject.name}</h2><span>{nextProject.location}</span></div>
          </Link>
        </section>

        <StartProjectCTA sourcePage={`/work/${project.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      </main>
      <SiteFooter />
    </>
  );
}

function groupGallery<T>(items: T[]) {
  const result: T[][] = [];
  let index = 0;
  let single = true;
  while (index < items.length) {
    const size = single ? 1 : 2;
    result.push(items.slice(index, index + size));
    index += size;
    single = !single;
  }
  return result;
}
