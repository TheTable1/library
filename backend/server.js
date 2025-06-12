require("dotenv").config({ path: ".env.local" });

const Hapi = require("@hapi/hapi");
const { prismaPlugin } = require("./src/plugin/prisma");
const { swaggerPlugin } = require("./src/plugin/swagger");
const { authPlugin } = require("./src/plugin/auth");
const routes = require("./src/routes");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    router: {
      stripTrailingSlash: true, 
    },
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        },
      },
      cors: {
        origin: ["*"],
        additionalHeaders: ["authorization"],
      },
    },
  });

  await server.register(prismaPlugin);
  await server.register(swaggerPlugin);
  await server.register(authPlugin);


  server.route(routes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
