const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFavById = async (userId) => {
  return await prisma.favBook.findMany({
    where: { userId },
    include: {
      book: {
        include: {
          categories: {
            include: {
              category: {
                select: { name: true }
              }
            }
          }
        }
      }
    }
  });
};

const createFavBook = async (userId, bookId) => {
  return await prisma.favBook.create({
    data: { userId, bookId },
    include: { book: true },
  });
};

const deleteFavBook = async (userId, favBookId) => {
  const fav = await prisma.favBook.findUnique({ where: { id: favBookId } });
  if (!fav) throw Boom.notFound("Favorite not found");

  if (fav.userId !== userId) throw Boom.forbidden("Not allowed");
  await prisma.favBook.delete({ where: { id: favBookId } });
  return { id: favBookId };
};

module.exports = {
  getFavById,
  createFavBook,
  deleteFavBook,
};
