const Boom = require("@hapi/boom");
const { verifyToken } = require("../utils/auth");

exports.authPlugin = {
  name: "auth",
  version: "1.0.0",
  register: async (server) => {
    server.auth.scheme("jwt", () => ({
      authenticate: (request, h) => {
        const auth = request.headers.authorization;
        if (!auth) throw Boom.unauthorized("Missing Authorization header");
        const [scheme, token] = auth.split(" ");
        if (scheme !== "Bearer" || !token)
          throw Boom.unauthorized("Bad authorization format");
        try {
          const payload = verifyToken(token);
          const credentials = { ...payload, scope: [payload.role] };
          return h.authenticated({ credentials });
        } catch (err) {
          throw Boom.unauthorized("Invalid or expired token");
        }
      },
    }));

    server.auth.strategy("jwt", "jwt");
    server.auth.default("jwt");
  },
};
