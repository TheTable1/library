const { z } = require("zod");
const { loginSchema } = require("../validations/auth.validation");
const validateZod = require("../validations/validateZod");
const userService = require("../services/user.service");
const { success, error, unauthorized } = require("../utils/response.utils");
const { signToken } = require("../utils/auth");

const login = {
  description: "User login to get JWT",
  tags: ["api", "auth"],
  auth: false,
  validate: {
    payload: validateZod(loginSchema),
  },
  handler: async (request, h) => {
    try {
      const { email, password } = request.payload;
      const user = await userService.validateUser(email, password);
      const token = signToken({
        id: user.uId,
        email: user.email,
        role: user.role,
      });
      return success(h, { token }, "Login successful");
    } catch (err) {
      console.error(err);
      if (err instanceof z) {
        const msg = err.issues.map((i) => i.message).join(", ");
        return error(h, msg, 400);
      }
      return unauthorized(h, err.message);
    }
  },
};

module.exports = { login };
