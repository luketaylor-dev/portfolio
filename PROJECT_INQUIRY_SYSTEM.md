# Project Inquiry System Documentation

This document outlines the structured project inquiry system implemented in the portfolio site.

## Overview

The Project Inquiry System provides a comprehensive, multi-step form for potential clients to submit detailed project requests. This system helps qualify leads and gather essential information upfront, leading to better project planning and faster response times.

## Features

### ✅ **Multi-Step Form Process**

- **Step 1**: Contact Information (Name, Email, Company)
- **Step 2**: Project Overview (Type, Timeline, Budget Range)
- **Step 3**: Project Details (Title, Description, Requirements)
- **Step 4**: Additional Information (Files, Notes)

### ✅ **Project Type Categories**

- **VR Development**: Virtual reality experiences and applications
- **EEG Visualization**: Brainwave data visualization and analysis
- **Game Development**: Unity games and interactive experiences
- **Mobile App**: Mobile applications with Unity
- **Interactive Installation**: Interactive exhibits and installations
- **Other**: Custom Unity development project

### ✅ **Timeline Options**

- **1-2 weeks**: Quick turnaround needed
- **1-2 months**: Standard project timeline
- **3-6 months**: Complex project development
- **6+ months**: Long-term project
- **Flexible**: Timeline can be discussed

### ✅ **Budget Ranges**

- **Under $5,000**: Small project or prototype
- **$5,000 - $15,000**: Medium complexity project
- **$15,000 - $50,000**: Complex project
- **$50,000+**: Enterprise-level project
- **Let's discuss**: Budget to be determined

### ✅ **File Upload Support**

- **Supported formats**: Images (JPEG, PNG, GIF), PDFs, Text files
- **File size limit**: 10MB per file
- **Multiple files**: Up to 10 files per submission

### ✅ **Validation & Error Handling**

- **Real-time validation**: Field validation on blur/touch
- **Step validation**: Prevents progression with incomplete data
- **Error messages**: Clear, user-friendly error feedback
- **Success feedback**: Confirmation messages and next steps

## Implementation

### **Components**

#### ProjectInquiryForm

```typescript
import { ProjectInquiryForm } from "@/components/content";

<ProjectInquiryForm
  onSuccess={() => console.log("Inquiry submitted")}
  onError={(error) => console.error(error)}
/>;
```

#### API Endpoint

- **Route**: `/api/sendProjectInquiry`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Response**: JSON with success/error status

### **Form Data Structure**

```typescript
interface ProjectInquiryData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  timeline: string;
  budgetRange: string;
  projectTitle: string;
  description: string;
  requirements: string;
  referenceLinks: string;
  additionalInfo: string;
}
```

### **Email Integration**

The system integrates with EmailJS to send structured project inquiries:

```typescript
// Email template parameters
{
  from_name: "Client Name",
  from_email: "client@example.com",
  subject: "New Project Inquiry: Project Title",
  message: "Formatted project details..."
}
```

## User Experience

### **Step-by-Step Process**

1. **Contact Information**

   - Full name (required)
   - Email address (required, validated)
   - Company (optional)

2. **Project Overview**

   - Project type selection (radio buttons with descriptions)
   - Timeline selection (dropdown)
   - Budget range selection (dropdown)

3. **Project Details**

   - Project title (required, min 3 characters)
   - Project description (required, min 20 characters)
   - Technical requirements (optional, min 10 characters)
   - Reference links (optional)

4. **Additional Information**
   - Additional notes (optional)
   - File uploads (optional, up to 10 files)
   - Next steps information

### **Visual Feedback**

- **Progress indicator**: Shows current step and completion
- **Validation feedback**: Real-time error messages
- **Loading states**: Spinner during form submission
- **Success confirmation**: Clear success message with next steps

### **Navigation**

- **Next/Previous buttons**: Navigate between steps
- **Step validation**: Prevents progression with incomplete data
- **Data persistence**: Form data maintained between steps

## Testing

### **Test Coverage**

The system includes comprehensive tests covering:

- ✅ Form rendering and step indicators
- ✅ Field validation and error handling
- ✅ Step navigation and data persistence
- ✅ Project type selection
- ✅ Form submission and API integration
- ✅ Success/error state handling

### **Running Tests**

```bash
# Run all project inquiry tests
pnpm test src/components/content/__tests__/project-inquiry-form-simple.test.tsx

# Run specific test
pnpm test --testNamePattern="submits form successfully"
```

## Integration

### **Contact Page Integration**

The contact page includes a link to the project inquiry form:

```typescript
<div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
  <p className="text-sm text-purple-300 mb-2">
    <strong>Have a detailed project?</strong>
  </p>
  <p className="text-xs text-purple-400 mb-3">
    Use my structured project inquiry form for better project planning and
    faster response times.
  </p>
  <InteractiveButton href="/inquire" variant="secondary" size="sm">
    Submit Project Inquiry
  </InteractiveButton>
</div>
```

### **Dedicated Page**

The project inquiry form is available at `/inquire` with:

- **SEO metadata**: Proper title and description
- **Hero section**: Clear value proposition
- **Form component**: Full multi-step process

## Benefits

### **For Clients**

- **Structured approach**: Clear process for project submission
- **Better communication**: Detailed requirements gathering
- **Faster response**: Pre-qualified inquiries get priority
- **Professional experience**: Polished, multi-step form

### **For You**

- **Lead qualification**: Better understanding of project scope
- **Efficient processing**: Structured data format
- **Reduced back-and-forth**: More context upfront
- **Professional appearance**: Shows organization and expertise

## Future Enhancements

### **Planned Features**

- **Project templates**: Pre-defined project types with specific questions
- **Quote generation**: Automatic rough estimates based on inputs
- **Calendar integration**: Schedule consultation calls directly
- **Project tracking**: Client portal to track inquiry status

### **Analytics**

- **Inquiry tracking**: Monitor form completion rates
- **Conversion analysis**: Track inquiry to project conversion
- **Performance metrics**: Form load times and user behavior

## Best Practices

### **Form Design**

- **Progressive disclosure**: Information revealed step by step
- **Clear validation**: Immediate feedback on errors
- **Accessible design**: Proper labels and ARIA attributes
- **Mobile optimization**: Touch-friendly interface

### **Data Handling**

- **Secure transmission**: HTTPS and proper validation
- **File validation**: Type and size restrictions
- **Error recovery**: Graceful handling of network issues
- **Data privacy**: Clear privacy policy and data handling

## Troubleshooting

### **Common Issues**

1. **File upload failures**

   - Check file size limits (10MB)
   - Verify supported file types
   - Ensure proper network connection

2. **Form validation errors**

   - Check required field completion
   - Verify email format
   - Ensure minimum character requirements

3. **API integration issues**
   - Verify EmailJS configuration
   - Check environment variables
   - Monitor API response logs

### **Debug Mode**

Enable debug logging for development:

```typescript
// Add to form component for debugging
console.log("Form data:", formData);
console.log("Validation errors:", errors);
```

---

_Last updated: January 2025_
