const userRoutes = require('./user.route');
const bookRoutes = require('./book.route');
const authRoutes = require('./auth.route');
const listRoutes = require('./list.route');
const categoryRoutes = require('./category.route');
const favRoutes = require('./favorite.route');

module.exports = [
    ...userRoutes,
    ...bookRoutes,
    ...authRoutes,
    ...listRoutes,
    ...categoryRoutes,
    ...favRoutes
]