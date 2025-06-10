const { z } = require("zod");

const createUserSchema = z.object({
  fName: z.string().min(1, "First name is required"),
  lName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z.string().min(2, "Address must be at least 2 characters long"),
});

const updateUserSchema = z
  .object({
    fName: z.string().optional(),
    lName: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    position: z.string().optional(),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .optional(),
    address: z
      .string()
      .min(2, "Address must be at least 2 characters long")
      .optional(),
    photo: z.string().url("Invalid URL format").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
};
