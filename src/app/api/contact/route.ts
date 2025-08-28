import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // EmailJS configuration - these are now private server-side
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    console.log("EmailJS Config:", {
      serviceId: serviceId ? "✅ Set" : "❌ Missing",
      templateId: templateId ? "✅ Set" : "❌ Missing",
      publicKey: publicKey ? "✅ Set" : "❌ Missing",
      environment: process.env.NODE_ENV,
    });

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send email using EmailJS REST API directly
    console.log("Attempting to send email...");

    const emailjsUrl = `https://api.emailjs.com/api/v1.0/email/send`;
    const emailData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        user_name: name,
        user_email: email,
        message: message,
      },
    };

    const response = await fetch(emailjsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    console.log("EmailJS API response status:", response.status);

    if (response.ok) {
      const result = await response.json();
      console.log("EmailJS result:", result);
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error("EmailJS API error:", errorText);
      throw new Error(`EmailJS API error: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error("Contact form error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
