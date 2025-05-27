const { z } = require("zod");

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

const updateCategorySchema = z
  .object({
    name: z.string().min(1, "Category name is required").optional(),
    detail: z.string().min(1, "Category detail is required").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    idParamSchema
}