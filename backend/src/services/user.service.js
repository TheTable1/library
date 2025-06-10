const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const { formatDateTime } = require("../utils/dateTime.utils");

const validateUser = async (email, plainPassword) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(plainPassword, user.password);
  if (!match) throw new Error("Invalid credentials");
  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map((user) => ({
    id: user.id,
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
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user.id,
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
  const hashed = await bcrypt.hash(data.password, 10);
  const newUser = await prisma.user.create({
    data: { ...data, password: hashed },
  });
  return {
    id: newUser.id,
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
  const { fName, lName, phone, address, password, photo } = data;

  let hashedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const updateData = {
    ...(fName !== undefined && { fName }),
    ...(lName !== undefined && { lName }),
    ...(phone !== undefined && { phone }),
    ...(address !== undefined && { address }),
    ...(hashedPassword && { password: hashedPassword }),
    ...(photo !== undefined && { photo }),
  };

  const updated = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });

  return {
    id: updated.uId,
    fName: updated.fName,
    lName: updated.lName,
    email: updated.email,
    role: updated.role,
    memberSince: formatDateTime(updated.memberSince),
    phone: updated.phone,
    address: updated.address,
    photo: updated.photo,
  };
};

const deleteUser = async (id) => {
  const deleted = await prisma.user.delete({ where: { id: Number(id) } });
  return {
    id: deleted.id,
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
  validateUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
