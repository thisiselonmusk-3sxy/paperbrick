export type ProjectCategory = "Residential" | "Hospital";
export type ProjectScope =
  | "Architectural Consultant"
  | "Architectural & Interior Consultant";
export type ProjectStatus = "Ongoing" | "Completed";

export type ImageAsset = {
  src: string;
  sourceUrl: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  location: string;
  siteAreaSqFt: number | null;
  builtUpAreaSqFt: number;
  category: ProjectCategory;
  scope: ProjectScope;
  status: ProjectStatus;
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  featured: boolean;
  order: number;
  description?: string;
};

export type SiteSettings = {
  brandName: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  address: string | null;
  instagramUrl: string | null;
};

export type EnquiryFormData = {
  name: string;
  phone: string;
  email: string;
  projectLocation: string;
  projectType: string;
  scope: string;
  estimatedArea: string;
  preferredContact: string;
  message: string;
};
