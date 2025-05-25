const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Package = require("../../package.json");

exports.swaggerPlugin = {
  name: "swagger",
  version: "1.0.0",
  register: async function (server) {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: "My API Documentation",
            version: Package.version,
            description: "This is a sample API documentation",
          },
          grouping: "tags",

          securityDefinitions: {
            BearerAuth: {
              type: "apiKey",
              name: "Authorization",
              in: "header",
              description:
                "Enter your JWT token in the format *Bearer &lt;token>*",
            },
          },
          security: [{ BearerAuth: [] }],
        },
      },
    ]);
  },
};
