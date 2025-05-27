const {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
} = require("../validations/user.validation");
const validateZod = require("../validations/validateZod");
const userService = require("../services/user.service");
const {
  success,
  error,
  notFound,
  created,
} = require("../utils/response.utils");

const getAllUsers = {
  description: "Get all users",
  tags: ["api", "users"],
  auth: {
    strategy: "jwt",
    scope: ["admin"],
  },
  handler: async (request, h) => {
    try {
      const users = await userService.getAllUsers();
      return success(h, users, "Fetched users successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const getMe = {
  description: "Get logged in user profile",
  tags: ["api", "users"],
  auth: { strategy: "jwt" }, // ต้อง login
  handler: async (request, h) => {
    try {
      const { id } = request.auth.credentials;
      const user = await userService.getUserById(id);
      if (!user) return notFound(h, "User not found");
      return success(h, user, "Fetched profile");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const getUserById = {
  description: "Get user by ID",
  tags: ["api", "users"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const user = await userService.getUserById(Number(id));
      return success(h, user, "User retrieved successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const createUser = {
  description: "Create a new user",
  tags: ["api", "users"],
  auth: false, 
  validate: {
    payload: validateZod(createUserSchema),
  },
  handler: async (request, h) => {
    try {
      const newUser = await userService.createUser(request.payload);
      return created(h, newUser, "User created successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const updateUser = {
  description: "Update user by ID",
  tags: ["api", "users"],
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateUserSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const updatedUser = await userService.updateUser(
        Number(id),
        request.payload
      );
      return success(h, updatedUser, "User updated successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const deleteUser = {
  description: "Delete user by ID",
  tags: ["api", "users"],
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      await userService.deleteUser(Number(id));
      return success(h, null, "User deleted successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe,
};
