/**
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *   - `sendHTTPCode` send 401 (Unauthorized) HTTP code instead of redirecting to _/login_. Overrides other options.
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
 *     app.get('/api/profile',
 *      ensureLoggedIn({sendHTTPCode:true}),
 *      function(req, res){ ... });
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
module.exports = function ensureLoggedIn(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};
  
  var url = options.redirectTo || '/login';
  var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
  var sendHTTPCode = (options.sendHTTPCode === undefined) ? false : options.sendHTTPCode;
  
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if(sendHTTPCode){
          return res.send(401);
      }else{
          if (setReturnTo && req.session) {
            req.session.returnTo = req.originalUrl || req.url;
          }
          return res.redirect(url);
      }
    }
    next();
  }
}
