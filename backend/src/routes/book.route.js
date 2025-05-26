const bookController = require("../controllers/book.controller");

module.exports = [
    {
        method: "GET",
        path: "/books",
        options: bookController.getAllBooks,
    },
    {
        method: "GET",
        path: "/books/{id}",
        options: bookController.getBookById,
    },
    {
        method: "POST",
        path: "/books",
        options: bookController.createBook,
    },
    {
        method: "PUT",
        path: "/books/{id}",
        options: bookController.updateBook,
    },
    { 
        method: "DELETE", 
        path: "/books/{id}", 
        options: bookController.deleteBook 
    },
];
