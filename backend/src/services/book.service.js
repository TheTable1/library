const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBooks = async () => {
    const books = await prisma.book.findMany({ include: { categories: true } });
    return books.map((b) => ({
        id: b.id,
        name: b.name,
        author: b.author,
        isbn: b.isbn,
        totalCopies: b.totalCopies,
        availableCopies: b.availableCopies,
        photo: b.photo,
        detail: b.detail,
        page: b.page,
        price: b.price,
        categories: b.categories.map((c) => ({
            id: c.id,
            categoryId: c.categoryId,
        })),
    }));
};

const getBookById = async (id) => {
    const b = await prisma.book.findUnique({
        where: { id: Number(id) },
        include: { categories: true },
    });
    if (!b) throw new Error("Book not found");
    return {
        id: b.id,
        name: b.name,
        author: b.author,
        isbn: b.isbn,
        totalCopies: b.totalCopies,
        availableCopies: b.availableCopies,
        photo: b.photo,
        detail: b.detail,
        page: b.page,
        price: b.price,
        categories: b.categories.map((c) => ({
            id: c.id,
            categoryId: c.categoryId,
        })),
    };
};

const createBook = async (data) => {
  const {
    name,
    author,
    isbn,
    totalCopies,
    availableCopies,
    detail,
    page,
    price,
    categories, 
  } = data;

  return prisma.book.create({
    data: {
      name,
      author,
      isbn,
      totalCopies,
      availableCopies,
      detail,
      page,
      price,
      categories: {
        create: categories.map((catId) => ({ categoryId: catId })),
      },
    },
    include: {
      categories: {
        select: { category: { select: { name: true } } },
      },
    },
  });
};
  

const updateBook = async (id, data) => {
    const b = await prisma.book.update({ where: { id: Number(id) }, data });
    return {
        id: b.id,
        name: b.name,
        author: b.author,
        isbn: b.isbn,
        totalCopies: b.totalCopies,
        availableCopies: b.availableCopies,
        photo: b.photo,
        detail: b.detail,
        page: b.page,
        price: b.price,
    };
};

const deleteBook = async (id) => {
    const b = await prisma.book.delete({ where: { id: Number(id) } });
    return { id: b.id };
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
