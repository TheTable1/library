const {
  success,
  error,
  notFound,
  created,
} = require("../utils/response.utils");
const {
  addFavBookSchema,
  favBookIdParamSchema,
} = require("../validations/favorite.validation");
const validateZod = require("../validations/validateZod");

const favBookService = require("../services/favorite.service");

const getFavById = {
  description: "Get all lists",
  tags: ["api", "favorite"],
  auth: {
    strategy: "jwt",
  },
  handler: async (request, h) => {
    try {
      const userId = Number(request.auth.credentials.id);
      const data = await favBookService.getFavById(userId);
      return success(h, data, "Fetched Favorite Book");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const addFavBook = {
  description: "Get all lists",
  tags: ["api", "favorite"],
  auth: {
    strategy: "jwt",
  },
  validate: {
    payload: validateZod(addFavBookSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.id;
      const { bookId } = request.payload;
      const fav = await favBookService.createFavBook(userId, bookId);
      return success(h, fav, "Add Favorite Book");
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  },
};

const deleteFavBook = {
  description: "Get all lists",
  tags: ["api", "favorite"],
  auth: {
    strategy: "jwt",
  },
  validate: {
    params: validateZod(favBookIdParamSchema),
  },
  handler: async (request, h) => {
    try {
      const userId = request.auth.credentials.id;
      const favBookId = request.params.id;
      const result = await favBookService.deleteFavBook(userId, favBookId);
      if (!result) {
        return notFound(h, null, "Favorite not found");
      }
      return success(h, result, "Delete Favorite Book");
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
