import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
  contact: z
    .string()
    .min(10, { message: "Contact number at least 10 digit" })
    .max(10, "Contact number at most 10 digit"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;





// import { z } from "zod";

// export const userSignupSchema = z.object({
//   fullname: z
//     .string()
//     .min(1, "Fullname is required")
//     .refine(
//       (value) => !/<script>|<\/script>/i.test(value),
//       "Fullname contains invalid characters"
//     ),
//   email: z
//     .string()
//     .email("Invalid email format"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters"), 
//   contact: z
//     .string()
//     .regex(/^\d+$/, "Contact must be numeric")
//     .min(10, "Contact number must be exactly 10 digits")
//     .max(10, "Contact number must be exactly 10 digits"),
// });

// export type SignupInputState = z.infer<typeof userSignupSchema>;

// export const userLoginSchema = z.object({
//   email: z
//     .string()
//     .email("Invalid email address"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters"), 
// });

// export type LoginInputState = z.infer<typeof userLoginSchema>;
