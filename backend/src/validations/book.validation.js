const { z } = require("zod");

const createBookSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  totalCopies: z
    .number()
    .int()
    .nonnegative("Total copies must be 0 or greater"),
  availableCopies: z
    .number()
    .int()
    .nonnegative("Available copies must be 0 or greater"),
  photo: z.string().url("Invalid URL format").optional(),
  detail: z.string().optional(),
  page: z.number().int().positive("Page count must be at least 1").optional(),
  price: z.number().nonnegative("Price must be 0 or greater").optional(),
});

const updateBookSchema = createBookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
  createBookSchema,
  updateBookSchema,
  idParamSchema,
};
