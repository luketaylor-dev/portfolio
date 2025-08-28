import { NextResponse } from "next/server";

export async function GET() {
  // Only show this in development for security
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({
      message: "Environment check disabled in production for security",
      environment: process.env.NODE_ENV,
    });
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    emailjsServiceId: process.env.EMAILJS_SERVICE_ID ? "✅ Set" : "❌ Missing",
    emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID
      ? "✅ Set"
      : "❌ Missing",
    emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY ? "✅ Set" : "❌ Missing",
    vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "Not set",
    timestamp: new Date().toISOString(),
  });
}
