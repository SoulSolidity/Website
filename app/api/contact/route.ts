import { ContactServiceFactory } from "@/app/services/contact/ContactServiceFactory";
import { ContactFormData } from "@/app/services/contact/IContactService";
import { NextResponse } from "next/server";

// Simple rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware
 *
 * @param ip The IP address to check
 * @returns true if the request should be rate limited, false otherwise
 */
function shouldRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  // If no record exists or the reset time has passed, create a new record
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  // Increment the count
  record.count += 1;

  // Check if the count exceeds the limit
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
}

/**
 * Validate contact form data
 *
 * @param data The contact form data to validate
 * @returns An object with validation errors, or null if the data is valid
 */
function validateContactForm(data: any): Record<string, string> | null {
  const errors: Record<string, string> = {};

  // Check if required fields are present
  if (!data) {
    errors.general = "No data provided";
    return errors;
  }

  // Validate name
  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length < 2
  ) {
    errors.name = "Name must be at least 2 characters";
  }

  // Validate email
  if (
    !data.email ||
    typeof data.email !== "string" ||
    !data.email.includes("@")
  ) {
    errors.email = "Please enter a valid email";
  }

  // Validate message
  if (
    !data.message ||
    typeof data.message !== "string" ||
    data.message.trim().length < 10
  ) {
    errors.message = "Message must be at least 10 characters";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    // In a real production environment, you would get this from headers like X-Forwarded-For
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limiting
    if (shouldRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const data = await request.json();

    // Validate form data
    const validationErrors = validateContactForm(data);
    if (validationErrors) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }

    // Get contact service
    const contactService = ContactServiceFactory.getContactService();

    // Send contact form data
    const success = await contactService.sendContactForm(
      data as ContactFormData
    );

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send message. Please try again later.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
