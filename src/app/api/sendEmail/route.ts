import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, message, website } = await request.json();

  // Server-side spam protection
  if (website && website.trim() !== "") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY, // Private key for strict mode
          template_params: {
            user_name: name,
            user_email: email,
            message: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = "Failed to send email";
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
