const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.prismaPlugin = {
  name: "prismaPlugin",
  version: "1.0.0",
  register: async (server) => {
    server.app.prisma = prisma;
    server.ext("onPostStop", async () => await prisma.$disconnect());
  },
};
