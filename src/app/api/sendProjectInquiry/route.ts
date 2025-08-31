import { NextRequest, NextResponse } from "next/server";

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    // Create email content
    const emailSubject = `New Project Inquiry: ${projectTitle}`;

    const emailBody = `
New Project Inquiry Received

Contact Information:
- Name: ${name}
- Email: ${email}
${company ? `- Company: ${company}` : ""}

Project Details:
- Project Title: ${projectTitle}
- Project Type: ${projectTypeLabels[projectType]}
- Timeline: ${timelineLabels[timeline]}
- Budget Range: ${budgetLabels[budgetRange]}

Project Description:
${description}

${requirements ? `Technical Requirements:\n${requirements}\n` : ""}
${referenceLinks ? `Reference Links:\n${referenceLinks}\n` : ""}
${additionalInfo ? `Additional Information:\n${additionalInfo}\n` : ""}

${
  files.length > 0
    ? `\nAttached Files: ${files.map((f) => f.name).join(", ")}`
    : ""
}

---
This inquiry was submitted through your portfolio website.
    `.trim();

    // Send email using EmailJS (similar to your existing contact form)
    const emailjsResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_USER_ID,
          template_params: {
            from_name: name,
            from_email: email,
            message: emailBody,
            subject: emailSubject,
          },
        }),
      }
    );

    if (!emailjsResponse.ok) {
      throw new Error("Failed to send email");
    }

    // Log the inquiry for your records
    console.log("Project Inquiry Received:", {
      name,
      email,
      company,
      projectType: projectTypeLabels[projectType],
      timeline: timelineLabels[timeline],
      budgetRange: budgetLabels[budgetRange],
      projectTitle,
      description,
      requirements,
      referenceLinks,
      additionalInfo,
      filesCount: files.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing project inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
