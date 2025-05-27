const userController = require("../controllers/user.controller");

module.exports = [
  {
    method: "GET",
    path: "/users",
    options: userController.getAllUsers,
  },
  {
    method: "GET",
    path: "/users/me",
    options: userController.getMe,
  },
  {
    method: "GET",
    path: "/users/{id}",
    options: userController.getUserById,
  },
  {
    method: "POST",
    path: "/users",
    options: userController.createUser,
  },
  {
    method: "PUT",
    path: "/users/{id}",
    options: userController.updateUser,
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    options: userController.deleteUser,
  },
];
