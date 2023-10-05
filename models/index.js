const User = require('./User');
const Blog = require('./Blog');

//users can have many blogs, but blogs can only have one user.
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {User, Blog};
