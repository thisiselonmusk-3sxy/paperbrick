import { describe, expect, it } from "vitest";
import { buildEnquiryMessage, buildEnquiryWhatsAppUrl, validateEnquiry } from "@/lib/enquiry";
import type { EnquiryFormData } from "@/content/types";

const valid: EnquiryFormData = {
  name: "Asha",
  phone: "+91 90000 00000",
  email: "",
  projectLocation: "Thoothukudi",
  projectType: "Residential",
  scope: "Architecture + Interiors",
  estimatedArea: "2400 sq ft",
  preferredContact: "WhatsApp",
  message: "A new family home.",
};

describe("enquiry handoff", () => {
  it("requires project facts and one contact method", () => {
    expect(validateEnquiry({ ...valid, name: "", phone: "" })).toMatchObject({ name: expect.any(String), phone: expect.any(String), email: expect.any(String) });
  });

  it("builds an honest WhatsApp handoff", () => {
    expect(validateEnquiry(valid)).toEqual({});
    expect(buildEnquiryMessage(valid)).toContain("Project location: Thoothukudi");
    expect(buildEnquiryWhatsAppUrl(valid)).toMatch(/^https:\/\/wa\.me\/919500881113\?text=/);
  });
});
