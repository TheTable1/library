const { ZodError } = require("zod");
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
  auth: false,
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

const getUserById = {
  description: "Get user by ID",
  tags: ["api", "users"],
  auth: false,
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
      if (err instanceof ZodError) {
        const msg = err.issues.map((i) => i.message).join(", ");
        return error(h, msg, 400);
      }
      return error(h, err.message);
    }
  },
};

const updateUser = {
  description: "Update user by ID",
  tags: ["api", "users"],
  auth: false,
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
  auth: false,
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
};
