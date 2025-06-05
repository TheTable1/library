const validateZod = require('../validations/validateZod');
const {
  createListSchema,
  returnListSchema,
  idParamSchema,
  updateListSchema,
} = require("../validations/list.validation");
const listService = require('../services/list.service');
const {
  success,
  created,
  error,
  notFound,
} = require('../utils/response.utils');

const getAllLists = {
  description: 'Get all lists',
  tags: ['api', 'lists'],
  auth: {
    strategy: 'jwt',
    scope: ['admin'],
  },
  handler: async (request, h) => {
    try {
      const lists = await listService.getAllLists();
      return success(h, lists, 'Fetched lists successfully');
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const getListById = {
  description: 'Get list by id',
  tags: ['api', 'lists'],
  auth: {
    strategy: 'jwt',
    scope: ['admin'],
  },
  handler: async (request, h) => {
    try {
      const listId = request.params.id;
      const list = await listService.getListById(listId);
      return list
        ? success(h, list, 'Fetched list successfully')
        : notFound(h, 'List not found');
    } catch (err) {
      console.error(err);
      return notFound(h, 'List not found');
    }
  },
};

const getMyList = {
  description: 'Get list by id',
  tags: ['api', 'lists'],
  auth: {
    strategy: 'jwt',
  },
  handler: async (request, h) => {
    try {
      const { id } = request.auth.credentials;
      const list = await listService.getMyList(id);
      return list
        ? success(h, list, 'Fetched list successfully')
        : notFound(h, 'List not found');
    } catch (err) {
      console.error(err);
      return notFound(h, 'List not found');
    }
  },
};

const getUserList = {
  description: 'Get list by user id',
  tags: ['api', 'lists'],
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },
  handler: async (request, h) => {
    try {
      const id = request.params.id;
      const list = await listService.getMyList(id);
      return list
        ? success(h, list, 'Fetched list successfully')
        : notFound(h, 'List not found');
    } catch (err) {
      console.error(err);
      return notFound(h, 'List not found');
    }
  },
};

const createList = {
  description: "Create a new borrowing list",
  tags: ["api", "lists"],
  auth: { 
    strategy: "jwt", 
    scope: ["admin"] },
  validate: {
    payload: validateZod(createListSchema),
  },
  handler: async (request, h) => {
    try {
      const { userId, bookIds, dueDate } = request.payload;
      const newList = await listService.createList(
        { bookIds, dueDate },
        userId
      );
      return created(h, newList, "List created successfully");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const returnList = {
  description: "Return books for a list",
  tags: ["api", "lists"],
  auth: {
    strategy: "jwt",
    scope: ["admin"],
  },
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(returnListSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const returned = await listService.returnList(id, request.payload);
      return success(h, returned, "Books returned successfully");
    } catch (err) {
      console.error(err);
      if (err.message === "List not found") {
        return notFound(h, err.message);
      }
      return error(h, err.message);
    }
  },
};

const updateList = {
  description: "Update an existing list",
  tags: ["api", "lists"],
  auth: {
    strategy: "jwt",
    scope: ["admin"],
  },
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateListSchema), 
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      const { userId, bookIds, dueDate } = request.payload;
      const updated = await listService.updateList(id, {
        userId,
        bookIds,
        dueDate,
      });
      return success(h, updated, "List updated successfully");
    } catch (err) {
      console.error(err);
      if (err.message === "List not found") {
        return notFound(h, err.message);
      }
      return error(h, err.message);
    }
  },
};

const deleteList = {
  description: "Delete a loan list",
  tags: ["api", "lists"],
  auth: {
    strategy: "jwt",
    scope: ["admin"],
  },
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    try {
      const { id } = request.params;
      await listService.deleteList(id);
      return success(h, null, "List deleted successfully");
    } catch (err) {
      console.error(err);
      if (err.message === "List not found") {
        return notFound(h, err.message);
      }
      return error(h, err.message);
    }
  },
};

module.exports = {
  getAllLists,
  getListById,
  createList,
  returnList,
  updateList,
  deleteList,
  getMyList,
  getUserList,
};
