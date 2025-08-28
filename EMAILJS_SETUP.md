# 📧 EmailJS Setup Guide

## 🆓 **Free Email Service Setup**

Your contact form now uses **EmailJS** - a free email service with 200 emails/month on the free tier!

## 🚀 **Setup Steps**

### **1. Create EmailJS Account**

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a **free account**
3. Verify your email

### **2. Create Email Service**

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your preferred email provider)
4. Connect your email account
5. **Copy the Service ID** (you'll need this)

### **3. Create Email Template**

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```html
Subject: New Contact Form Submission from {{user_name}}

<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{user_name}}</p>
<p><strong>Email:</strong> {{user_email}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

4. **Copy the Template ID** (you'll need this)

### **4. Get Your Public Key**

1. Go to **"Account"** → **"API Keys"**
2. **Copy your Public Key**

### **5. Add Environment Variables**

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## ✅ **What You Get**

- 🆓 **200 emails/month** (free tier)
- ✅ **No backend** required
- ✅ **Spam protection** built-in
- ✅ **Professional delivery**
- ✅ **Email tracking** (optional)

## 🔧 **Testing**

1. Fill out your contact form
2. Submit a test message
3. Check your email inbox
4. Check EmailJS dashboard for delivery status

## 💡 **Pro Tips**

- **Service ID**: Looks like `service_abc123`
- **Template ID**: Looks like `template_xyz789`
- **Public Key**: Looks like `user_def456`

## 🚨 **Important Notes**

- **Environment variables** must start with `NEXT_PUBLIC_` to work in the browser
- **Restart your dev server** after adding `.env.local`
- **Free tier** includes 200 emails/month
- **No credit card** required for free tier

---

## 🎉 **You're All Set!**

Your contact form will now send real emails without any paid services! 🚀
