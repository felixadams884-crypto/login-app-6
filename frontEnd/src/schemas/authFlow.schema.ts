import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email or phone is required')
    .refine(
      (value) => {
        const trimmed = value.trim();
        const isEmail = z.string().email().safeParse(trimmed).success;
        const phoneDigits = trimmed.replace(/[\s()-]/g, '');
        const isPhone = /^\+?\d{7,15}$/.test(phoneDigits);
        return isEmail || isPhone;
      },
      {
        message: 'Please enter a valid email or phone number',
      },
    ),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = emailSchema.merge(passwordSchema);

export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
