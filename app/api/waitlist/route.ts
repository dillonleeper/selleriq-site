import { after, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function notifySignup(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.WAITLIST_EMAIL_FROM ?? "SellerIQ <onboarding@resend.dev>",
      to: [process.env.WAITLIST_NOTIFICATION_TO ?? "leeperdillon@gmail.com"],
      subject: "New SellerIQ early-access signup",
      html: `<p><strong>${escapeHtml(email)}</strong> joined the SellerIQ early-access list.</p>`,
    }),
  });

  if (!response.ok) throw new Error(`Resend returned ${response.status}`);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  let email = "";
  let ctaLocation: "hero" | "final" = "hero";
  try {
    const body = (await request.json()) as { email?: unknown; ctaLocation?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    ctaLocation = body.ctaLocation === "final" ? "final" : "hero";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Waitlist is not configured" }, { status: 503 });
  }

  const signup = await fetch(`${supabaseUrl}/rest/v1/waitlist_signups`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({ email, cta_location: ctaLocation }),
  });

  if (!signup.ok) {
    console.error("Waitlist insert failed", { status: signup.status });
    return NextResponse.json({ error: "Unable to join waitlist" }, { status: 502 });
  }

  after(async () => {
    try {
      await notifySignup(email);
    } catch (error) {
      console.error("Waitlist notification failed", error);
    }
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
