"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ProjectViewTracker({ slug }: { slug: string }) {
  useEffect(() => trackEvent({ name: "view_project", projectSlug: slug }), [slug]);
  return null;
}
