import type { SiteSettings } from "./types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.paperbrickarchitects.com";

export const siteSettings: SiteSettings = {
  brandName: "Paper Brick Architects",
  email: "info@paperbrick.com",
  phoneDisplay: "+91 95008 81113",
  phoneHref: "+919500881113",
  whatsappNumber: "919500881113",
  address: null,
  instagramUrl: null,
};

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const baseWhatsAppMessage =
  "Hello Paper Brick Architects, I’m planning a project and would like to discuss architecture/interior design services.";

export function makeWhatsAppUrl(message = baseWhatsAppMessage) {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
