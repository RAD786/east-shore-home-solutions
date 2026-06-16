/**
 * Lead contact form handler — /api/contact
 *
 * Flow:
 *   1. Accept multipart/form-data (supports an optional photo upload).
 *   2. Validate server-side with the shared Zod schema.
 *   3. Build a clean lead object.
 *   4. Fan out to whatever integrations are configured (env-gated):
 *        - GHL webhook       (GHL_WEBHOOK_URL)
 *        - Resend emails     (RESEND_API_KEY)  → owner + customer
 *        - Twilio owner SMS  (TWILIO_* vars)
 *   5. If nothing is configured, log the lead (dev) and still return success.
 *
 * Design rules:
 *   - Never expose secrets. All credentials come from environment vars.
 *   - Never crash if an optional integration is missing or fails — each
 *     dispatcher is isolated with allSettled and its own try/catch.
 *   - Never send a real SMS/email unless the matching env vars are present.
 *
 * Environment variables (see .env.example):
 *   LEAD_NOTIFY_EMAIL   owner inbox for new-lead notifications
 *   OWNER_PHONE         owner phone for SMS alerts (E.164, e.g. +16099941137)
 *   RESEND_API_KEY      enables owner + customer emails
 *   RESEND_FROM_EMAIL   verified "from" address for Resend
 *   GHL_WEBHOOK_URL     GoHighLevel inbound webhook
 *   TWILIO_ACCOUNT_SID  } enables owner SMS alerts
 *   TWILIO_AUTH_TOKEN   }
 *   TWILIO_FROM_NUMBER  }
 *   NEXT_PUBLIC_SITE_URL public site URL
 */

import { NextResponse } from "next/server";
import { contactFormSchema, URGENCY_OPTIONS } from "@/lib/validators";
import { siteConfig } from "@/lib/siteConfig";
import { services } from "@/lib/services";

export const runtime = "nodejs";

type Lead = {
  name: string;
  phone: string;
  email: string;
  address?: string;
  /** Raw service value submitted (slug or "other") */
  service: string;
  /** Human-readable service label for emails/SMS */
  serviceLabel: string;
  /** Raw urgency value */
  urgency: string;
  /** Human-readable urgency label */
  urgencyLabel: string;
  message?: string;
  /** Original uploaded file name (if any) */
  photoName?: string;
  /** Public URL once the photo is stored (see storePhoto TODO) */
  photoUrl?: string;
  submittedAt: string;
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const raw = {
      name: str(form.get("name")),
      phone: str(form.get("phone")),
      email: str(form.get("email")),
      address: str(form.get("address")),
      service: str(form.get("service")),
      urgency: str(form.get("urgency")),
      message: str(form.get("message")),
      company: str(form.get("company")), // honeypot
    };

    // Honeypot: silently accept (so bots think they succeeded) but drop it.
    if (raw.company) {
      return NextResponse.json({ ok: true });
    }

    const parsed = contactFormSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check the form and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const photo = form.get("photo");
    const photoFile = photo instanceof File && photo.size > 0 ? photo : null;

    // Persist the photo to durable storage (stubbed — see storePhoto).
    const photoUrl = photoFile ? await storePhoto(photoFile) : undefined;

    const data = parsed.data;
    const lead: Lead = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address || undefined,
      service: data.service,
      serviceLabel: serviceLabel(data.service),
      urgency: data.urgency,
      urgencyLabel: urgencyLabel(data.urgency),
      message: data.message || undefined,
      photoName: photoFile?.name,
      photoUrl,
      submittedAt: new Date().toISOString(),
    };

    // Dispatch to every configured integration. Failures are logged but
    // never block the user's success response — we never want a lead lost.
    const results = await Promise.allSettled([
      postToGhl(lead),
      sendEmails(lead),
      sendOwnerSms(lead),
    ]);

    const anyConfigured = results.some(
      (r) => r.status === "fulfilled" && r.value === "sent",
    );

    // Nothing wired up yet (e.g. local dev / first deploy): log the lead.
    if (!anyConfigured) {
      console.log("[contact] New lead (no integrations configured):");
      console.log(leadToText(lead));
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thanks! Your request was received — we'll be in touch shortly.",
    });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again or call us." },
      { status: 500 },
    );
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Resolve a service value (slug or "other") to a human label. */
function serviceLabel(value: string): string {
  const match = services.find((s) => s.slug === value);
  if (match) return match.shortTitle;
  return value === "other" ? "Other / Not sure" : value;
}

/** Resolve an urgency value to its human label. */
function urgencyLabel(value: string): string {
  return URGENCY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/** Where the customer is, for the SMS/email (address falls back to region). */
function leadLocation(lead: Lead): string {
  return lead.address && lead.address.length > 0
    ? lead.address
    : siteConfig.regionShort;
}

type DispatchResult = "sent" | "skipped";

/**
 * Persist an uploaded photo to durable storage and return a public URL.
 *
 * TODO: Photo upload handling is NOT fully implemented yet. The frontend
 * already sends the file as multipart/form-data and we receive it here as
 * a `File`. To finish this:
 *   1. Pick a storage provider (Vercel Blob, AWS S3, Cloudinary, etc.).
 *   2. Read bytes: `const bytes = Buffer.from(await file.arrayBuffer())`.
 *   3. Upload under a unique key (e.g. `leads/${timestamp}-${file.name}`).
 *   4. Return the resulting public/signed URL so it can be attached to the
 *      notification email/SMS and pushed into the CRM.
 * Keep credentials in env vars — never hard-code keys.
 *
 * For now we just log that a photo was received and return undefined.
 */
async function storePhoto(file: File): Promise<string | undefined> {
  console.log(
    `[contact] (stub) photo received: ${file.name} (${file.size} bytes, ${file.type}) — storage provider not yet configured.`,
  );
  // Example (Vercel Blob), once `@vercel/blob` is installed & token is set:
  // const { put } = await import("@vercel/blob");
  // const { url } = await put(`leads/${file.name}`, file, { access: "public" });
  // return url;
  return undefined;
}

// ─────────────────────────────────────────────────────────────
// Integration dispatchers (env-gated; safe no-ops when unconfigured)
// ─────────────────────────────────────────────────────────────

/**
 * POST the lead to a GoHighLevel inbound webhook.
 * Shape the payload to match your GHL webhook / custom fields and
 * pipeline. Suggested first stage: "New Lead".
 */
async function postToGhl(lead: Lead): Promise<DispatchResult> {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) return "skipped";

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: lead.name,
        phone: lead.phone,
        email: lead.email,
        address1: lead.address ?? "",
        source: "Website Lead Form",
        tags: ["website-lead", lead.service, lead.urgency],
        customField: {
          service: lead.serviceLabel,
          urgency: lead.urgencyLabel,
          message: lead.message ?? "",
          photo: lead.photoUrl ?? lead.photoName ?? "",
        },
        pipelineStage: "New Lead",
        submittedAt: lead.submittedAt,
      }),
    });
    return "sent";
  } catch (e) {
    console.error("[contact] GHL webhook failed:", e);
    // Treat as "sent" attempt so we don't double-log; failure is recorded.
    return "sent";
  }
}

/**
 * Send the owner notification + customer confirmation emails via Resend.
 * Uses the Resend REST API directly (no SDK dependency). Only runs when
 * RESEND_API_KEY is present.
 */
async function sendEmails(lead: Lead): Promise<DispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "skipped";

  const from =
    process.env.RESEND_FROM_EMAIL ??
    `${siteConfig.businessName} <leads@eastshorehomesolutions.com>`;
  const ownerTo = process.env.LEAD_NOTIFY_EMAIL ?? siteConfig.email;

  // 1) Owner notification
  await sendResendEmail(apiKey, {
    from,
    to: ownerTo,
    replyTo: lead.email,
    subject: "New Website Lead - East Shore Home Solutions",
    text: leadToText(lead),
  });

  // 2) Customer confirmation
  await sendResendEmail(apiKey, {
    from,
    to: lead.email,
    replyTo: ownerTo,
    subject: "We received your request | East Shore Home Solutions",
    text: customerConfirmationText(lead),
  });

  return "sent";
}

/** Low-level Resend send helper. Logs and swallows failures. */
async function sendResendEmail(
  apiKey: string,
  msg: {
    from: string;
    to: string;
    subject: string;
    text: string;
    replyTo?: string;
  },
): Promise<void> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: msg.from,
        to: [msg.to],
        subject: msg.subject,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error(
        `[contact] Resend send failed (${res.status}): ${await res.text()}`,
      );
    }
  } catch (e) {
    console.error("[contact] Resend request error:", e);
  }
}

/**
 * Send an SMS alert to the owner via Twilio. Uses the Twilio REST API
 * directly (no SDK dependency). Only runs when all Twilio vars are set.
 */
async function sendOwnerSms(lead: Lead): Promise<DispatchResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.OWNER_PHONE ?? siteConfig.phoneRaw;

  if (!sid || !token || !from) return "skipped";

  const body = `New East Shore lead: ${lead.name} needs ${lead.serviceLabel} in ${leadLocation(lead)}. Urgency: ${lead.urgencyLabel}. Phone: ${lead.phone}.`;

  try {
    const params = new URLSearchParams({ To: to, From: from, Body: body });
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );
    if (!res.ok) {
      console.error(
        `[contact] Twilio send failed (${res.status}): ${await res.text()}`,
      );
    }
  } catch (e) {
    console.error("[contact] Twilio request error:", e);
  }
  return "sent";
}

// ─────────────────────────────────────────────────────────────
// Message bodies
// ─────────────────────────────────────────────────────────────

/** Owner notification body — full lead details. */
function leadToText(lead: Lead): string {
  return [
    `New lead from the ${siteConfig.businessName} website`,
    "",
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email}`,
    `Address:  ${lead.address ?? "(not provided)"}`,
    `Service:  ${lead.serviceLabel}`,
    `Urgency:  ${lead.urgencyLabel}`,
    `Message:  ${lead.message ?? "(none)"}`,
    `Photo:    ${lead.photoUrl ?? lead.photoName ?? "(none)"}`,
    `Sent:     ${lead.submittedAt}`,
  ].join("\n");
}

/** Customer confirmation body. */
function customerConfirmationText(lead: Lead): string {
  return [
    `Hi ${lead.name},`,
    "",
    `Thank you for reaching out to ${siteConfig.businessName}. We've received your request for ${lead.serviceLabel} and someone will reach out to you shortly to discuss the details and your free estimate.`,
    "",
    `If your issue is urgent, please call us directly at ${siteConfig.phone} and we'll do our best to help right away.`,
    "",
    "Talk soon,",
    `${siteConfig.businessName}`,
    `${siteConfig.phone}`,
  ].join("\n");
}
