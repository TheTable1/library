const {
  success,
  error,
  notFound,
  created,
} = require('../utils/response.utils');

const {
  addFavBookSchema,
  favBookIdParamSchema,
} = require('../validations/favorite.validation');
const validateZod = require('../validations/validateZod');
const favBookService = require('../services/favorite.service');

const getFavById = {
  description: "Get user's favorite books",
  tags: ["api", "favorite"],
  auth: { strategy: "jwt" },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.id);
      const data = await favBookService.getFavById(userId);
      return success(h, data, "Fetched Favorite Books");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const addFavBook = {
  description: "Add a favorite book",
  tags: ["api", "favorite"],
  auth: { strategy: "jwt" },
  validate: {
    payload: validateZod(addFavBookSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.id);
      const { bookId } = request.payload;
      const fav = await favBookService.createFavBook(userId, bookId);
      return created(h, fav, "Added Favorite Book");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const deleteFavBook = {
  description: "Remove a favorite book",
  tags: ["api", "favorite"],
  auth: { strategy: "jwt" },
  validate: {
    params: validateZod(favBookIdParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.id);
      const favBookId = Number(request.params.id);
      const result = await favBookService.deleteFavBook(userId, favBookId);
      if (!result) {
        return notFound(h, null, "Favorite not found");
      }
      return success(h, result, "Deleted Favorite Book");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

module.exports = {
  getFavById,
  addFavBook,
  deleteFavBook,
};