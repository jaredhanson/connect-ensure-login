/**
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * If you want to require authentication for all paths:
 *    app.all('*', connect.ensureLoggedIn('/login'), function(req, res, next){
 *      next(); 
 *    });
 * but want a select few paths (primarily assets) pages to not 
 * require authentication, pass an array of strings (into allowedPaths) of
 * allowed paths that should not require authentication.
 * 
 * Example:
 *    app.all('*', connect.ensureLoggedIn('/login', [
 *      '/stylesheets/login.css',
 *      '/javascripts/login.js',
 *      '/images/logo.png',
 *      '/images/favicon.png'
 *    ]), function(req, res, next){
 *      next(); 
 *    });
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *
 * Examples:
 *
 *     app.get('/profile',
 *       ensureLoggedIn(),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn('/signin'),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
 *       function(req, res) { ... });
 *
 * @param {Object} options
 * @param {Object} allowedPaths
 * @return {Function}
 * @api public
 */
module.exports = function ensureLoggedIn(options, allowedPaths) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};
  
  var url = options.redirectTo || '/login';
  var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
  
  return function(req, res, next) {
    if (allowedPaths !== null){
      var _ = require('underscore');
      if (_.contains(allowedPaths, req.path)){
        next();
      }else{
        if (!req.isAuthenticated || !req.isAuthenticated()) {
          if (setReturnTo && req.session) {
            req.session.returnTo = req.originalUrl || req.url;
          }
          return res.redirect(url);
        }
        next();
      }
    }
  }
}
