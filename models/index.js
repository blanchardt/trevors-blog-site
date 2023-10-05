const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
const BlogComment = require('./BlogComment');


//users can have many blogs, but blogs can only have one user.
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

//a user can have many blogs, and many blogs can have many comments.
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.belongsToMany(Comment, {
    through: {
      model: BlogComment,
      unique: false
    }
  });
  
Comment.belongsToMany(Blog, {
through: {
    model: BlogComment,
    unique: false
}
});

module.exports = {User, Blog, Comment, BlogComment};
