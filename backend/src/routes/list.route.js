const listController = require('../controllers/list.controller');

module.exports = [
    {
        method: "GET",
        path: "/lists",
        options: listController.getAllLists,
    },
    {
        method: "GET",
        path: "/lists/{id}",
        options: listController.getListById,
    },
    {
        method: "GET",
        path: "/my-lists",
        options: listController.getMyList,
    },
    {
        method: "POST",
        path: "/lists",
        options: listController.createList,
    },
    {
        method: "PUT",
        path: "/lists/{id}",
        options: listController.updateList,
    },
    {
        method: "PUT",
        path: "/lists/{id}/return",
        options: listController.returnList,
    },
    {
        method: "DELETE",
        path: "/lists/{id}",
        options: listController.deleteList
    }
];