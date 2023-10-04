const withAuth = (req, res, next) => {
  //check if user is loged in, if they are not, then redirect the user to the login url.
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
