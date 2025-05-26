const {
    createBookSchema,
    updateBookSchema,
    idParamSchema,
} = require("../validations/book.validation");
const validateZod = require("../validations/validateZod");
const bookService = require("../services/book.service");
const {
    success,
    created,
    error,
    notFound,
} = require("../utils/response.utils");

const getAllBooks = {
    description: "Get all books",
    tags: ["api", "books"],
    auth: false,
    handler: async (req, h) => {
        try {
            const list = await bookService.getAllBooks();
            return success(h, list, "Fetched books successfully");
        } catch (err) {
            console.error(err);
            return error(h, err.message);
        }
    },
};

const getBookById = {
    description: "Get book by ID",
    tags: ["api", "books"],
    auth: false,
    validate: { params: validateZod(idParamSchema) },
    handler: async (req, h) => {
        try {
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            return success(h, book, "Book retrieved successfully");
        } catch (err) {
            console.error(err);
            return error(h, err.message);
        }
    },
};

const createBook = {
    description: "Create a new book",
    tags: ["api", "books"],
    auth: {
        strategy: "jwt",
        scope: ["admin"],
    },
    validate: { payload: validateZod(createBookSchema) },
    handler: async (req, h) => {
        try {
            const newB = await bookService.createBook(req.payload);
            return created(h, newB, "Book created successfully");
        } catch (err) {
            console.error(err);
            return error(h, err.message);
        }
    },
};

const updateBook = {
    description: "Update book by ID",
    tags: ["api", "books"],
    auth: {
        strategy: "jwt",
        scope: ["admin"],
    },
    validate: {
        params: validateZod(idParamSchema),
        payload: validateZod(updateBookSchema),
    },
    handler: async (req, h) => {
        try {
            const { id } = req.params;
            const updated = await bookService.updateBook(id, req.payload);
            return success(h, updated, "Book updated successfully");
        } catch (err) {
            console.error(err);
            return error(h, err.message);
        }
    },
};

const deleteBook = {
    description: "Delete book by ID",
    tags: ["api", "books"],
    auth: {
        strategy: "jwt",
        scope: ["admin"],
    },
    validate: { params: validateZod(idParamSchema) },
    handler: async (req, h) => {
        try {
            const { id } = req.params;
            await bookService.deleteBook(id);
            return success(h, null, "Book deleted successfully");
        } catch (err) {
            console.error(err);
            return error(h, err.message);
        }
    },
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
