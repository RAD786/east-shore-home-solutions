"use client";

/**
 * Lead capture form. React Hook Form + Zod validation, accessible
 * labels, optional photo upload, honeypot spam trap. Submits as
 * multipart/form-data to /api/contact.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  contactFormDefaults,
  type ContactFormValues,
  SERVICE_OPTIONS,
  URGENCY_OPTIONS,
} from "@/lib/validators";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Pre-select a service (e.g. from a service page) */
  defaultService?: string;
};

const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB

export default function ContactForm({ defaultService }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      ...contactFormDefaults,
      service: defaultService ?? "",
    },
  });

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotoError(null);
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Photo must be under 8MB.");
      setPhoto(null);
      e.target.value = "";
      return;
    }
    setPhoto(file);
  }

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ""));
      if (photo) fd.append("photo", photo);

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
      setPhoto(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-seafoam-500/30 bg-seafoam-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-seafoam-500 text-white">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">
          Thank you — request received!
        </h3>
        <p className="mt-2 text-navy/70">
          Thanks for reaching out to East Shore Home Solutions. We&apos;ll
          contact you shortly with your free estimate.
        </p>
        <p className="mt-3 text-sm text-navy/70">
          Have an emergency or need us ASAP? Please call us directly so we can
          help right away:
        </p>
        <a
          href={siteConfig.phoneHref}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-navy hover:bg-accent-600"
        >
          Call {siteConfig.phone}
        </a>
        <div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-semibold text-seafoam-600 hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      encType="multipart/form-data"
    >
      {/* Honeypot — visually hidden, must stay empty */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message} required>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            {...aria("name", !!errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message} required>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
            {...aria("phone", !!errors.phone)}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" error={errors.email?.message} required>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass(!!errors.email)}
          {...aria("email", !!errors.email)}
          {...register("email")}
        />
      </Field>

      <Field
        label="Property Address or Town"
        htmlFor="address"
        error={errors.address?.message}
        hint="(optional, but helps us)"
      >
        <input
          id="address"
          type="text"
          autoComplete="street-address"
          placeholder="123 Main St, Toms River NJ"
          className={inputClass(!!errors.address)}
          {...aria("address", !!errors.address)}
          {...register("address")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Service Needed"
          htmlFor="service"
          error={errors.service?.message}
          required
        >
          <select
            id="service"
            className={inputClass(!!errors.service)}
            {...aria("service", !!errors.service)}
            {...register("service")}
          >
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="How soon?"
          htmlFor="urgency"
          error={errors.urgency?.message}
          required
        >
          <select
            id="urgency"
            className={inputClass(!!errors.urgency)}
            {...aria("urgency", !!errors.urgency)}
            {...register("urgency")}
          >
            <option value="">Select urgency…</option>
            {URGENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Tell us about the job"
        htmlFor="message"
        error={errors.message?.message}
        required
      >
        <textarea
          id="message"
          rows={4}
          placeholder="A few details about what you need help with…"
          className={inputClass(!!errors.message)}
          {...aria("message", !!errors.message)}
          {...register("message")}
        />
      </Field>

      {/* Photo upload */}
      <div>
        <label
          htmlFor="photo"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Add a photo <span className="text-navy/60">(optional)</span>
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          className="block w-full text-sm text-navy/70 file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-600"
        />
        {photo && (
          <p className="mt-1 text-xs text-navy/70">Attached: {photo.name}</p>
        )}
        {photoError && (
          <p className="mt-1 text-xs font-medium text-red-600">{photoError}</p>
        )}
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Something went wrong sending your request. Please call us at the
          number above or try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-navy shadow-sm transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Request My Free Estimate"}
      </button>
      <p className="text-center text-xs text-navy/60">
        By submitting, you agree to be contacted about your request. We respect
        your privacy and never sell your info.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  /** Short muted note after the label (e.g. "optional but encouraged") */
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-navy"
      >
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
        {hint && <span className="ml-1 font-normal text-navy/60">{hint}</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="mt-1 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/** Shared aria attributes wiring an input to its error message. */
function aria(id: string, hasError: boolean) {
  return {
    "aria-invalid": hasError || undefined,
    "aria-describedby": hasError ? `${id}-error` : undefined,
  };
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-navy shadow-sm outline-none transition-colors",
    "placeholder:text-navy/40 focus:ring-2 focus:ring-seafoam-500/40",
    hasError
      ? "border-red-400 focus:border-red-400"
      : "border-navy/15 focus:border-seafoam-500",
  ].join(" ");
}
