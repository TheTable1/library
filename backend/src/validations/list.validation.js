const { z } = require("zod");

const createListSchema = z.object({
  userId: z
    .number({ invalid_type_error: "userId must be a number" })
    .int("userId must be an integer")
    .positive("userId must be positive"),
  bookIds: z
    .array(z.number().int())
    .min(1, "At least one book must be specified"),
  dueDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), "Invalid due date format"),
});

const returnListSchema = z.object({
  userId: z.number().int().positive(),
  bookIds: z.array(z.number().int()).min(1),
  dueDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
});

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

const updateListSchema = z.object({
  userId: z.number().int().positive("userId must be a positive integer"),
  bookIds: z
    .array(z.number().int())
    .min(1, "At least one book must be specified"),
  dueDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), "Invalid dueDate format"),
});

module.exports = {
  createListSchema,
  returnListSchema,
  idParamSchema,
  updateListSchema,
};
