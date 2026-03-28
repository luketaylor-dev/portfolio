import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const projectType = formData.get("projectType") as string;
    const timeline = formData.get("timeline") as string;
    const budgetRange = formData.get("budgetRange") as string;
    const projectTitle = formData.get("projectTitle") as string;
    const description = formData.get("description") as string;
    const requirements = formData.get("requirements") as string;
    const referenceLinks = formData.get("referenceLinks") as string;
    const additionalInfo = formData.get("additionalInfo") as string;

    // Extract files
    const files: File[] = [];
    for (let i = 0; i < 10; i++) {
      // Limit to 10 files
      const file = formData.get(`file_${i}`) as File;
      if (file) {
        files.push(file);
      }
    }

    // Validate required fields
    if (
      !name ||
      !email ||
      !projectType ||
      !timeline ||
      !budgetRange ||
      !projectTitle ||
      !description
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Format project type for display
    const projectTypeLabels: Record<string, string> = {
      "vr-development": "VR Development",
      "eeg-visualization": "EEG Visualization",
      "game-development": "Game Development",
      "mobile-app": "Mobile App",
      "interactive-installation": "Interactive Installation",
      other: "Other",
    };

    const timelineLabels: Record<string, string> = {
      "1-2-weeks": "1-2 weeks",
      "1-2-months": "1-2 months",
      "3-6-months": "3-6 months",
      "6-plus-months": "6+ months",
      flexible: "Flexible",
    };

    const budgetLabels: Record<string, string> = {
      "under-5k": "Under $5,000",
      "5k-15k": "$5,000 - $15,000",
      "15k-50k": "$15,000 - $50,000",
      "50k-plus": "$50,000+",
      discuss: "Let's discuss",
    };

    // Note: We're now using individual template parameters instead of a single emailBody

    // Check if environment variables are configured
    if (
      !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_PROJECT_TEMPLATE_ID ||
      !process.env.EMAILJS_PUBLIC_KEY
    ) {
      console.error("Missing EmailJS environment variables");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Prepare EmailJS request payload
    const emailjsPayload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_PROJECT_TEMPLATE_ID, // New template ID
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        user_name: name,
        user_email: email,
        company: company || "",
        title: projectTitle, // For the subject line
        project_title: projectTitle,
        project_type: projectTypeLabels[projectType],
        timeline: timelineLabels[timeline],
        budget_range: budgetLabels[budgetRange],
        description: description,
        requirements: requirements || "",
        reference_links: referenceLinks || "",
        additional_info: additionalInfo || "",
      },
    };

    // Send email using EmailJS (similar to your existing contact form)
    const emailjsResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailjsPayload),
      }
    );

    if (!emailjsResponse.ok) {
      const text = await emailjsResponse.text();
      let errorMessage = "Unknown error";
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }
      console.error("EmailJS API error:", errorMessage);
      throw new Error(`EmailJS API error: ${emailjsResponse.status} ${errorMessage}`);
    }

    // Log the inquiry for your records
    // console.log("Project Inquiry Received:", {
    //   name,
    //   email,
    //   company,
    //   projectType: projectTypeLabels[projectType],
    //   timeline: timelineLabels[timeline],
    //   budgetRange: budgetLabels[budgetRange],
    //   projectTitle,
    //   description,
    //   requirements,
    //   referenceLinks,
    //   additionalInfo,
    //   filesCount: files.length,
    //   timestamp: new Date().toISOString(),
    // });

    return NextResponse.json({
      success: true,
      message: "Project inquiry sent successfully!",
    });
  } catch (error) {
    console.error("Error processing project inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
