const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { formatDateTime } = require("../utils/dateTime.utils");

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map((user) => ({
    id: user.uId,
    firstName: user.fName,
    lastName: user.lName,
    email: user.email,
    role: user.role,
    memberSince: formatDateTime(user.memberSince),
    phone: user.phone,
    address: user.address,
    photo: user.photo,
  }));
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { uId: Number(id) } });
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user.uId,
    firstName: user.fName,
    lastName: user.lName,
    email: user.email,
    role: user.role,
    memberSince: formatDateTime(user.memberSince),
    phone: user.phone,
    address: user.address,
    photo: user.photo,
  };
};

const createUser = async (data) => {
  const newUser = await prisma.user.create({ data });
  return {
    id: newUser.uId,
    firstName: newUser.fName,
    lastName: newUser.lName,
    email: newUser.email,
    role: newUser.role,
    memberSince: formatDateTime(newUser.memberSince),
    phone: newUser.phone,
    address: newUser.address,
  };
};

const updateUser = async (id, data) => {
  const updated = await prisma.user.update({
    where: { uId: Number(id) },
    data,
  });
  return {
    id: updated.uId,
    firstName: updated.fName,
    lastName: updated.lName,
    email: updated.email,
    role: updated.role,
    memberSince: formatDateTime(updated.memberSince),
    phone: updated.phone,
    address: updated.address,
    photo: updated.photo,
  };
};

const deleteUser = async (id) => {
  const deleted = await prisma.user.delete({ where: { uId: Number(id) } });
  return {
    id: deleted.uId,
    firstName: deleted.fName,
    lastName: deleted.lName,
    email: deleted.email,
    role: deleted.role,
    memberSince: formatDateTime(deleted.memberSince),
    phone: deleted.phone,
    address: deleted.address,
    photo: deleted.photo,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
