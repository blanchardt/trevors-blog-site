const router = require('express').Router();
const { Comment, BlogComment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
    });

    const newBlogComment = await BlogComment.create({
      blog_id: req.body.blog_id,
      comment_id: newComment.id,
    })

    res.status(200).json(newBlogComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
