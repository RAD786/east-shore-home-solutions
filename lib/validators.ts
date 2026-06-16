/**
 * Zod schema for the lead contact form. Shared between the client
 * (React Hook Form resolver) and the server (API route validation).
 */

import { z } from "zod";
import { services } from "./services";

export const URGENCY_OPTIONS = [
  { value: "emergency", label: "Emergency / ASAP" },
  { value: "this-week", label: "This week" },
  { value: "two-weeks", label: "Within 2 weeks" },
  { value: "flexible", label: "Flexible" },
] as const;

/** Service options for the dropdown — main services plus a catch-all. */
export const SERVICE_OPTIONS = [
  ...services.map((s) => ({ value: s.slug, label: s.shortTitle })),
  { value: "other", label: "Other / Not sure" },
];

const phoneRegex = /^[\d\s()+\-.]{7,20}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(phoneRegex, "Please enter a valid phone number"),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  // Optional but encouraged — helps us scope the job.
  address: z
    .string()
    .max(160, "Address is too long")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  urgency: z.string().min(1, "Please select how soon you need help"),
  message: z
    .string()
    .min(10, "Please tell us a bit about the job")
    .max(2000, "Message is too long"),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  company: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaults: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  urgency: "",
  message: "",
  company: "",
};
