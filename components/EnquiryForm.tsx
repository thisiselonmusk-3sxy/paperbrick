"use client";

import { useState } from "react";
import type { EnquiryFormData } from "@/content/types";
import { trackEvent } from "@/lib/analytics";
import { buildEnquiryWhatsAppUrl, type EnquiryErrors, validateEnquiry } from "@/lib/enquiry";
import styles from "./EnquiryForm.module.css";

const initialData: EnquiryFormData = {
  name: "",
  phone: "",
  email: "",
  projectLocation: "",
  projectType: "",
  scope: "",
  estimatedArea: "",
  preferredContact: "",
  message: "",
};

export function EnquiryForm() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<EnquiryErrors>({});

  function update(name: keyof EnquiryFormData, value: string) {
    setData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(data);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof EnquiryFormData | undefined;
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }
    trackEvent({ name: "enquiry_handoff", sourcePage: "/contact" });
    window.open(buildEnquiryWhatsAppUrl(data), "_blank", "noopener,noreferrer");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Field label="Name" name="name" value={data.name} error={errors.name} required onChange={update} />
      <Field label="Phone" name="phone" value={data.phone} error={errors.phone} inputMode="tel" onChange={update} />
      <Field label="Email" name="email" value={data.email} error={errors.email} inputMode="email" onChange={update} />
      <Field label="Project location" name="projectLocation" value={data.projectLocation} error={errors.projectLocation} required onChange={update} />
      <SelectField label="Project type" name="projectType" value={data.projectType} error={errors.projectType} options={["Residential", "Hospital / Healthcare", "Other"]} onChange={update} />
      <SelectField label="Scope" name="scope" value={data.scope} error={errors.scope} options={["Architecture", "Interiors", "Architecture + Interiors"]} onChange={update} />
      <Field label="Estimated area" name="estimatedArea" value={data.estimatedArea} inputMode="numeric" onChange={update} />
      <SelectField label="Preferred contact" name="preferredContact" value={data.preferredContact} options={["WhatsApp", "Phone", "Email"]} optional onChange={update} />
      <div className={`${styles.field} ${styles.full}`}>
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={data.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message && <span id="message-error" className={styles.error}>{errors.message}</span>}
      </div>
      <p className={styles.note}>Fields marked * are required. Provide at least a phone number or email address.</p>
      <button className={styles.submit} type="submit">Continue in WhatsApp</button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof EnquiryFormData;
  value: string;
  error?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (name: keyof EnquiryFormData, value: string) => void;
};

function Field({ label, name, value, error, required = false, inputMode, onChange }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <input id={name} name={name} value={value} inputMode={inputMode} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} onChange={(event) => onChange(name, event.target.value)} />
      {error && <span id={`${name}-error`} className={styles.error}>{error}</span>}
    </div>
  );
}

type SelectProps = Omit<FieldProps, "required" | "inputMode"> & { options: string[]; optional?: boolean };

function SelectField({ label, name, value, error, options, optional = false, onChange }: SelectProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}{!optional && <span aria-hidden="true"> *</span>}</label>
      <select id={name} name={name} value={value} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} onChange={(event) => onChange(name, event.target.value)}>
        <option value="">Select</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <span id={`${name}-error`} className={styles.error}>{error}</span>}
    </div>
  );
}
