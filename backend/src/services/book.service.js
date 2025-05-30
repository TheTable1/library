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
  const bookId = Number(id);

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

  if (!book || book.deleted) {
    throw new Error("Book not found");
  }
  return {
    id: book.id,
    name: book.name,
    author: book.author,
    isbn: book.isbn,
    totalCopies: book.totalCopies,
    availableCopies: book.availableCopies,
    photo: book.photo,
    detail: book.detail,
    page: book.page,
    price: book.price,

    categories: book.categories.map((bc) => ({
      id: bc.id,
      categoryId: bc.categoryId,
      name: bc.category.name,
    })),
  };
};

const createBook = async (data) => {
  const { categoryIds = [], ...rest } = data;

  const b = await prisma.book.create({
    data: {
      ...rest,
      categories: {
        create: categoryIds.map((cid) => ({
          category: { connect: { id: cid } },
        })),
      },
    },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

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
    categories: b.categories.map((bc) => ({
      id: bc.id,
      categoryId: bc.categoryId,
      name: bc.category.name,
    })),
  };
};

const updateBook = async (id, data) => {
  const { categoryIds, photo, ...rest } = data;

  const updatePayload = {
    ...rest,
    photo: photo ?? null,
    ...(Array.isArray(categoryIds)
      ? {
          categories: {
            deleteMany: {},
            create: categoryIds.map((cid) => ({
              category: { connect: { id: Number(cid) } }
            }))
          }
        }
      : {})
  };

  const b = await prisma.book.update({
    where: { id: Number(id) },
    data: updatePayload,
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  });

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
    categories: b.categories.map((join) => ({
      id: join.category.id,
      name: join.category.name,
      detail: join.category.detail
    }))
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
