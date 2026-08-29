import { displayScope } from "@/content/projects";
import type { Project } from "@/content/types";
import { formatArea } from "@/lib/format";
import styles from "./ProjectMetadata.module.css";

export function ProjectMetadata({ project }: { project: Project }) {
  const rows = [
    ["Project", project.name],
    ["Location", project.location],
    ["Category", project.category],
    ["Scope", displayScope(project.scope)],
    ["Status", project.status],
    ...(project.siteAreaSqFt ? [["Site area", formatArea(project.siteAreaSqFt)]] : []),
    ["Built-up area", formatArea(project.builtUpAreaSqFt)],
  ];

  return (
    <dl className={styles.meta}>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
