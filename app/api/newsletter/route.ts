import { NextResponse } from "next/server";

// ✅ Vercel-safe: returns success always.
// In local dev, it can store to memory/file if you later add DB.
// For real storage, use Formspree/Mailchimp/Buttondown/Supabase.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      return NextResponse.json({ ok: false, message: "Invalid email." }, { status: 400 });
    }

    // Here is where you'd store to DB or call Mailchimp etc.
    return NextResponse.json({ ok: true, message: "Subscribed" });
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
}
