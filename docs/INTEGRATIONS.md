# Integrations Checklist — Resend / Twilio / GoHighLevel

All lead-delivery integrations are **optional and env-gated**. The contact
handler ([app/api/contact/route.ts](../app/api/contact/route.ts)) checks for the
relevant environment variables at request time:

- If present → it sends via that channel.
- If absent → it skips that channel (no error). With nothing configured, the
  lead is logged to the server console and the user still sees success.

Add the env vars in **Vercel → Settings → Environment Variables** (and
`.env.local` for local testing), then redeploy.

---

## Resend — owner + customer emails

Sends the owner a "New Website Lead" email and the customer a confirmation
email. Uses the Resend REST API directly (no package to install).

- [ ] Create a [Resend](https://resend.com) account
- [ ] **Verify a sending domain** (or use a verified address) — required for
      `RESEND_FROM_EMAIL`
- [ ] Create an API key
- [ ] Set `RESEND_API_KEY`
- [ ] Set `RESEND_FROM_EMAIL` to the verified address
      (e.g. `leads@eastshorehomesolutions.com`)
- [ ] Set `LEAD_NOTIFY_EMAIL` to where the owner wants leads
      (`EastshorepropertyLLC@gmail.com`)
- [ ] Submit a test lead → confirm both emails arrive
      (check spam on first sends)

**Emails sent:**
- Owner: subject `New Website Lead - East Shore Home Solutions` (Reply-To = customer)
- Customer: subject `We received your request | East Shore Home Solutions`

---

## Twilio — owner SMS alert

Texts the owner when a lead comes in. Uses the Twilio REST API directly.

- [ ] Create a [Twilio](https://twilio.com) account
- [ ] Buy/verify a sending phone number
- [ ] Set `TWILIO_ACCOUNT_SID`
- [ ] Set `TWILIO_AUTH_TOKEN`
- [ ] Set `TWILIO_FROM_NUMBER` (the Twilio number, E.164)
- [ ] Confirm `OWNER_PHONE` = `+16099941137` (where alerts go)
- [ ] Submit a test lead → confirm the SMS arrives

**Message format:**
`New East Shore lead: [Name] needs [Service] in [Address/City]. Urgency: [Urgency]. Phone: [Phone].`

> No SMS is ever sent unless all three Twilio vars are present.

---

## GoHighLevel (GHL) — CRM webhook

POSTs each lead into GHL via an inbound webhook.

- [ ] In GHL, create an **Inbound Webhook** trigger (or workflow webhook)
- [ ] Copy the webhook URL → set `GHL_WEBHOOK_URL`
- [ ] Map the incoming fields to GHL contact/custom fields. The payload sends:
      `firstName, phone, email, address1, source, tags[], customField{ service,
      urgency, message, photo }, pipelineStage, submittedAt`
- [ ] (Optional) Build the pipeline. Suggested stages:
      **New Lead → Contacted → Estimate Scheduled → Estimate Sent → Job
      Scheduled → Completed → Review Requested → Won / Lost**
- [ ] Submit a test lead → confirm the contact/opportunity is created

> The payload includes `pipelineStage: "New Lead"` as a hint; adjust the route's
> payload shape to match your GHL field mapping if needed.

---

## Photo upload storage (not yet wired)

The form already uploads a photo; the route receives it but does **not** persist
it yet. See `storePhoto()` in
[app/api/contact/route.ts](../app/api/contact/route.ts) and
[IMAGES.md](IMAGES.md#lead-photo-uploads) for how to finish this with a storage
provider (Vercel Blob, S3, Cloudinary).

---

## Quick test matrix

| Configured | Expected behavior on submit |
| --- | --- |
| Nothing | Lead logged to server console; success shown |
| Resend only | Owner + customer emails sent |
| Twilio only | Owner SMS sent |
| GHL only | Lead POSTed to GHL |
| All | Email + SMS + GHL all fire |
