const userRoutes = require('./user.route');
const bookRoutes = require('./book.route');
const authRoutes = require('./auth.route');
const listRoutes = require('./list.route');

module.exports = [
    ...userRoutes,
    ...bookRoutes,
    ...authRoutes,
    ...listRoutes
]