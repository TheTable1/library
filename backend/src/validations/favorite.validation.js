const { z } = require("zod");

const addFavBookSchema = z.object({
  bookId: z
    .number({ invalid_type_error: "bookId must be a number." })
    .int("bookId must be an integer.")
    .positive("bookId must be greater than 0"),
});

const favBookIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "favBookId must be a number.")
    .transform((s) => parseInt(s, 10)),
});

module.exports = {
  addFavBookSchema,
  favBookIdParamSchema,
};
