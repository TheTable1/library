const {
  createCategorySchema,
  updateCategorySchema,
  idParamSchema,
} = require("../validations/category.validation");
const validateZod = require("../validations/validateZod");
const categoryService = require("../services/category.service");
const {
  success,
  created,
  error,
  notFound,
} = require("../utils/response.utils");

const getAllCategory = {
  description: "Get all category",
  tags: ["api", "category"],
  auth: false,
  handler: async (req, h) => {
    try {
      const category = await categoryService.getAllCategory();
      return success(h, category, "Fetched category successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  }
};

const getCategoryById = {
  description: "Get category by id",
  tags: ["api", "category"],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (req, h) => {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      if (!category) {
        return notFound(h, "Category not found");
      }
      return success(h, category, "Fetched category successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const createCategory = {
  description: 'Create a new category',
  tags: ['api', 'categories'],
  auth: 'jwt',
  validate: {
    payload: validateZod(createCategorySchema),
  },
  handler: async (request, h) => {
    try {
      const category = await categoryService.createCategory(request.payload);
      return created(h, category);
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const updateCategory = {
  description: 'Update category by ID',
  tags: ['api', 'categories'],
  auth: 'jwt',
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateCategorySchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const updated = await categoryService.updateCatagory(id, request.payload);
      return success(h, updated);
    } catch (err) {
      console.error(err);
      if (err.message === 'Category not found') {
        return notFound(h, err.message);
      }
      return error(h, err.message);
    }
  },
};

const deleteCategory = {
  description: 'Delete category by ID',
  tags: ['api', 'categories'],
  auth: 'jwt',
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      await categoryService.deleteCategory(id);
      return success(h, null, 'Category deleted successfully');
    } catch (err) {
      console.error(err);
      if (err.message === 'Category not found') {
        return notFound(h, err.message);
      }
      return error(h, err.message);
    }
  },
};


module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
