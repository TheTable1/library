const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllLists = async () => {
  const lists = await prisma.list.findMany({
    include: {
      user: {
        select: { id: true, fName: true, lName: true, email: true },
      },
      listBooks: {
        include: {
          book: { select: { id: true, name: true, author: true, isbn: true } },
        },
      },
    },
  });

  return lists.map((l) => ({
    id: l.id,
    loanDate: l.loanDate,
    dueDate: l.dueDate,
    returnedDate: l.returnedDate,
    fine: l.fine,
    status: l.status,
    user: {
      id: l.user.id,
      firstName: l.user.fName,
      lastName: l.user.lName,
      email: l.user.email,
    },
    books: l.listBooks.map((lb) => ({
      id: lb.book.id,
      name: lb.book.name,
      author: lb.book.author,
    })),
  }));
};

const getListById = async (id) => {
  const list = await getAllLists();
  const found = list.find((item) => item.id === Number(id));
  if (!found) throw new Error("List not found");
  return found;
};

const createList = async (data, userId) => {
  const { bookIds, dueDate } = data;
  const uid = Number(userId);
  if (isNaN(uid)) throw new Error("Invalid userId");

  const newEntry = await prisma.list.create({
    data: {
      loanDate: new Date(),
      dueDate: new Date(dueDate),
      status: "borrowed",
      userId: uid,
      listBooks: { create: bookIds.map((bookId) => ({ bookId })) },
    },
  });

  await Promise.all(
    bookIds.map((bId) =>
      prisma.book.update({
        where: { id: bId },
        data: { availableCopies: { decrement: 1 } },
      })
    )
  );

  return getListById(newEntry.id);
};

const returnList = async (id, data) => {
  const { returnedDate } = data;

  const listRaw = await prisma.list.findUnique({
    where: { id: Number(id) },
    include: { listBooks: true },
  });
  if (!listRaw) throw new Error("List not found");

  const due = listRaw.dueDate; 
  const ret = new Date(returnedDate);
  const daysLate = Math.ceil((ret - due) / (1000 * 60 * 60 * 24));
  const fine = daysLate > 0 ? daysLate * 5 : 0;

  await prisma.list.update({
    where: { id: Number(id) },
    data: { returnedDate: ret, fine, status: "returned" },
  });

  await Promise.all(
    listRaw.listBooks.map((lb) =>
      prisma.book.update({
        where: { id: lb.bookId },
        data: { availableCopies: { increment: 1 } },
      })
    )
  );

  return getListById(id);
};

const updateList = async (id, data) => {
  const listId = Number(id);
  const { userId, dueDate, bookIds } = data;

  const old = await prisma.list.findUnique({
    where: { id: listId },
    include: { listBooks: true },
  });
  if (!old) throw new Error("List not found");

  await Promise.all(
    old.listBooks.map((lb) =>
      prisma.book.update({
        where: { id: lb.bookId },
        data: { availableCopies: { increment: 1 } },
      })
    )
  );

  await prisma.listBook.deleteMany({ where: { listId } });

  await prisma.list.update({
    where: { id: listId },
    data: {
      ...(userId !== undefined && { userId: Number(userId) }),
      ...(dueDate && { dueDate: new Date(dueDate) }),
      listBooks: {
        create: bookIds.map((bookId) => ({ bookId: Number(bookId) })),
      },
    },
  });

  await Promise.all(
    bookIds.map((bookId) =>
      prisma.book.update({
        where: { id: bookId },
        data: { availableCopies: { decrement: 1 } },
      })
    )
  );

  return getListById(listId);
};

//แบบไม่ nested
const deleteList = async (id) => {
  const listId = Number(id);
  if (isNaN(listId)) throw new Error("Invalid list id");

  const existing = await prisma.list.findUnique({
    where: { id: listId },
    include: { listBooks: true },
  });
  if (!existing) {
    throw new Error("List not found");
  }

  await Promise.all(
    existing.listBooks.map((lb) =>
      prisma.book.update({
        where: { id: lb.bookId },
        data: { availableCopies: { increment: 1 } },
      })
    )
  );

  await prisma.listBook.deleteMany({
    where: { listId: listId },
  });

  await prisma.list.delete({
    where: { id: listId },
  });

  return { id: listId };
};
  
module.exports = {
  getAllLists,
  getListById,
  createList,
  returnList,
  updateList,
  deleteList,
};
