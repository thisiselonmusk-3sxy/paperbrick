export type AnalyticsEvent =
  | { name: "view_project"; projectSlug: string }
  | { name: "filter_work"; filter: string }
  | { name: "click_whatsapp"; sourcePage: string }
  | { name: "click_email"; sourcePage: string }
  | { name: "enquiry_handoff"; sourcePage: string };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("paperbrick:analytics", { detail: event }));
}
