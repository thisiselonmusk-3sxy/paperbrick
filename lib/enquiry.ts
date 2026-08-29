import { makeWhatsAppUrl } from "@/content/site";
import type { EnquiryFormData } from "@/content/types";

export type EnquiryErrors = Partial<Record<keyof EnquiryFormData, string>>;

export function validateEnquiry(data: EnquiryFormData): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!data.name.trim()) errors.name = "Enter your name.";
  if (!data.phone.trim() && !data.email.trim()) {
    errors.phone = "Enter a phone number or email address.";
    errors.email = "Enter a phone number or email address.";
  }
  if (data.email.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.projectLocation.trim()) errors.projectLocation = "Enter the project location.";
  if (!data.projectType.trim()) errors.projectType = "Choose a project type.";
  if (!data.scope.trim()) errors.scope = "Choose a design scope.";
  if (!data.message.trim()) errors.message = "Tell us a little about the project.";
  return errors;
}

export function buildEnquiryMessage(data: EnquiryFormData) {
  const lines = [
    "Hello Paper Brick Architects, I’d like to discuss a project.",
    "",
    `Name: ${data.name.trim()}`,
    data.phone.trim() ? `Phone: ${data.phone.trim()}` : null,
    data.email.trim() ? `Email: ${data.email.trim()}` : null,
    `Project location: ${data.projectLocation.trim()}`,
    `Project type: ${data.projectType.trim()}`,
    `Scope: ${data.scope.trim()}`,
    data.estimatedArea.trim() ? `Estimated area: ${data.estimatedArea.trim()}` : null,
    data.preferredContact.trim() ? `Preferred contact: ${data.preferredContact.trim()}` : null,
    "",
    data.message.trim(),
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

export function buildEnquiryWhatsAppUrl(data: EnquiryFormData) {
  return makeWhatsAppUrl(buildEnquiryMessage(data));
}
