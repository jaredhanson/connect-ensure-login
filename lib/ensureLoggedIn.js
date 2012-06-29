module.exports = function ensureLoggedIn(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};
  
  var url = options.redirectTo || '/login';
  var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
  
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.url;
      }
      return res.redirect(url);
    }
    next();
  }
}
