function checkAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  return next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect("/admin/dashboard");
  }
  return next();
}

export { checkAuthenticated, checkNotAuthenticated };
