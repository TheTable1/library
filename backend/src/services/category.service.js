const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCategory = async () => {
    const category = prisma.category.findMany();
    return category;
}

const getCategoryById = async (id) => {
    const category = prisma.category.findUnique({ where: { id: Number(id) } });
    if (!category) throw new Error("Category not found");
    return category;
}

const createCategory = async (data) => {
    const newCategory = prisma.category.create({ data });
    return newCategory;
}

const updateCatagory = async (id, data) => {
    const existing = await prisma.category.findUnique({where: { id: Number(id) },});
    if (!existing) throw new Error("Category not found");
    return prisma.category.update({where: { id: Number(id) },data,});
}

const deleteCategory = async (id) => {
    const existing = await prisma.category.findUnique({where: { id: Number(id) },});
    if (!existing) throw new Error("Category not found");
    return prisma.category.delete({where: { id: Number(id) },});
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCatagory,
    deleteCategory,
};