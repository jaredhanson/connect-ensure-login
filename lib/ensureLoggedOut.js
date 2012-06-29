module.exports = function ensureLoggedOut(url) {
  url = url || '/';
  
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect(url);
    }
    next();
  }
}
