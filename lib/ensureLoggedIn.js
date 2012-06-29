module.exports = function ensureLoggedIn(url) {
  url = url || '/login';
  
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect(url);
    }
    next();
  }
}
