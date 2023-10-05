const router = require('express').Router();
const { User, Blog, Comment, BlogComment } = require('../models');
const withAuth = require('../utils/auth');

//set up the homepage.
router.get('/', async (req, res) => {
  try {
    //Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    //Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    //Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//set up the homepage.
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    //Get all blogs and JOIN with user data
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    //Serialize data so the template can read it
    const blog = blogData.get({ plain: true });

    //Pass serialized data and session flag into template
    res.render('createComment', { 
      ...blog, 
      logged_in: true, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//set up a route to view all comments for the selected blog post.
router.get('/all-comments/:id', async (req, res) => {
  try {
    //Get all blogs and JOIN with user data
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        { 
          model: Comment, 
          through: BlogComment, 
          include: [
            {
              model: User,
              attributes:['username']
            }
          ],
        },
      ],
    });

    //Serialize data so the template can read it
    const blog = blogData.get({ plain: true });

    //Pass serialized data and session flag into template
    res.render('allComments', { 
      ...blog, 
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //get the current user by the session id.
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard/create', withAuth, async (req, res) => {
  res.render('newBlog', {
    logged_in: true
  });
});

//create a route to allow users to update their blog posts.
router.get('/dashboard/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blog = blogData.get({ plain: true });

    res.render('editBlog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//set up the login route.
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//set up the signup route.
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;