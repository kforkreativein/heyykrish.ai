import { z } from "zod";

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email too long"),
  name: z
    .string()
    .max(100, "Name too long")
    .optional()
    .transform((val) => val?.trim() || null),
  source: z
    .string()
    .max(50, "Source identifier too long")
    .optional()
    .default("homepage"),
});

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email too long"),
  company: z
    .string()
    .max(200, "Company name too long")
    .optional()
    .transform((val) => val?.trim() || null),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message too long")
    .transform((val) => val.trim()),
});

// Download lead schema
export const downloadLeadSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email too long"),
  resourceId: z
    .string()
    .min(1, "Resource ID is required")
    .max(50, "Resource ID too long"),
  resourceTitle: z
    .string()
    .max(200, "Resource title too long")
    .optional(),
});

// Type exports
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type DownloadLeadInput = z.infer<typeof downloadLeadSchema>;

// Validation helper that returns formatted errors
export function validateWithSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  // Return first error message
  const firstError = result.error.issues[0];
  return { success: false, error: firstError.message };
}
