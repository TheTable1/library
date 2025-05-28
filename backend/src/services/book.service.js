const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBooks = async () => {
  const books = await prisma.book.findMany({
    where: { deleted: false },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
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
      name: c.category.name
    })),
  }));
};

const getBookById = async (id) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { categories: { include: { category: true } } },
  });
  if (!book || book.deleted) throw new Error("Book not found");  
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
  const bookId = Number(id);

  const exists = await prisma.book.findUnique({ where: { id: bookId } });
  if (!exists) throw new Error("Book not found");

  // soft-delete
  const b = await prisma.book.update({
    where: { id: bookId },
    data: { deleted: true },
  });

  return {
    id: b.id,
    name: b.name,
    deleted: b.deleted,
  };
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
