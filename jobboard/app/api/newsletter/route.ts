import { NextResponse } from "next/server";

const JOBS = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "NovaTech",
    location: "Remote",
    type: "Full-time",
    pay: "$120k – $160k",
    posted: "2 days ago",
    tags: ["React", "Next.js", "TypeScript"],
    description: "Build performance-first UI systems with React and Next.js.",
  },
  {
    id: "2",
    title: "DevOps / Platform Engineer",
    company: "CloudSprint",
    location: "Remote",
    type: "Full-time",
    pay: "$140k – $190k",
    posted: "5 days ago",
    tags: ["AWS", "CI/CD", "Terraform"],
    description: "Own infrastructure, CI/CD, and reliability workflows.",
  },
  {
    id: "3",
    title: "Data Engineer",
    company: "ByteForge",
    location: "New York, NY",
    type: "Full-time",
    pay: "$125k – $175k",
    posted: "4 days ago",
    tags: ["SQL", "ETL"],
    description: "Build robust data pipelines.",
  },
  {
    id: "4",
    title: "Security Engineer",
    company: "SentinelWorks",
    location: "Remote",
    type: "Full-time",
    pay: "$145k – $200k",
    posted: "6 days ago",
    tags: ["AppSec", "Cloud"],
    description: "Secure cloud-native systems.",
  },
];

/* ===================== GET JOBS ===================== */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = 5;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return NextResponse.json({
    jobs: JOBS.slice(start, end),
    total: JOBS.length,
    page,
    pageSize,
  });
}

/* ===================== NEWSLETTER SUBSCRIBE ===================== */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      return NextResponse.json(
        { ok: false, message: "Invalid email." },
        { status: 400 }
      );
    }

    // Later: save to DB or send to Mailchimp / Buttondown
    return NextResponse.json({ ok: true, message: "Subscribed" });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request." },
      { status: 400 }
    );
  }
}
