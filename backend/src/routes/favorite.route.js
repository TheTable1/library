const favBookController = require("../controllers/favorite.controller");

module.exports =[
    {
        method: "GET",
        path: "/favorite",
        options: favBookController.getFavById
    },
    {
        method: "POST",
        path: "/favorite",
        options: favBookController.addFavBook
    },
    {
        method: "DELETE",
        path: "/favorite/{id}",
        options: favBookController.deleteFavBook
    }
]