const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_STAGES = new Set(["email", "qualification"]);

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) || null : null;
}

function cleanArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.slice(0, 40)).slice(0, 5);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = cleanText(body.email, 254)?.toLowerCase();
  const stage = cleanText(body.stage, 20);
  if (!email || !EMAIL_PATTERN.test(email) || !stage || !ALLOWED_STAGES.has(stage)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Supabase publishable keys identify a project but are not secrets. RLS limits
  // this key to insert-only waitlist access; environment variables can rotate it.
  const supabaseUrl = process.env.SUPABASE_URL || "https://rgczpqiwihagbzldeerg.supabase.co";
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_o7UvIj6RhiMEz3jEyNNyfA_7NO0rzwQ";

  const table = stage === "email" ? "waitlist_signups" : "waitlist_qualifications";
  const payload = stage === "email" ? {
    email,
    cta_location: cleanText(body.location, 30),
    source: cleanText(body.utmSource, 100),
    medium: cleanText(body.utmMedium, 100),
    campaign: cleanText(body.utmCampaign, 160),
    referrer: cleanText(body.referrer, 500),
  } : {
    email,
    revenue_band: cleanText(body.revenueBand, 80),
    sku_band: cleanText(body.skuBand, 80),
    primary_pain: cleanText(body.primaryPain, 120),
    marketplaces: cleanArray(body.marketplaces),
    current_tools: cleanText(body.currentTools, 160),
  };

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Waitlist connection failed", error);
    return Response.json({ error: "We couldn’t save your signup. Please try again." }, { status: 502 });
  }

  if (!response.ok) {
    const detail = await response.text();
    if (stage === "email" && response.status === 409) return Response.json({ ok: true, duplicate: true });
    console.error("Waitlist insert failed", response.status, detail.slice(0, 400));
    return Response.json({ error: "We couldn’t save your signup. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
