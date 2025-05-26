const userRoutes = require('./user.route');
const bookRoutes = require('./book.route');
const authRoutes = require('./auth.route');

module.exports = [
    ...userRoutes,
    ...bookRoutes,
    ...authRoutes
]