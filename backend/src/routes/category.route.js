const categoryController = require("../controllers/category.controller");

module.exports = [
  {
    method: "GET",
    path: "/category",
    options: categoryController.getAllCategory,
  },
  {
    method: "GET",
    path: "/category/{id}",
    options: categoryController.getCategoryById,
  },
  {
    method: "POST",
    path: "/category",
    options: categoryController.createCategory,
  },
  {
    method: "PUT",
    path: "/category/{id}",
    options: categoryController.updateCategory,
  },
  {
    method: "DELETE",
    path: "/category/{id}",
    options: categoryController.deleteCategory,
  },
];
