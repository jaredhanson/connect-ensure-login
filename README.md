# connect-ensure-login

This middleware ensures that a user is logged in.  If a request is received that
is unauthenticated, the request will be redirected to a login page.  The URL
will be saved in the session, so the user can be conveniently returned to the
page that was originally requested.

## Install

    $ npm install connect-ensure-login

## Usage

#### Ensure Authentication

In this example, an application has a settings page where preferences can be
configured.  A user must be logged in before accessing this page.

    app.get('/settings',
      ensureLoggedIn('/login'),
      function(req, res) {
        res.render('settings', { user: req.user });
      });
      
If a user is not logged in when attempting to access this page, the request will
be redirected to `/login` and the original request URL (`/settings`) will be
saved to the session at `req.session.returnTo`.

#### Log In and Return To

This middleware integrates seamlessly with [Passport](http://passportjs.org/).
Simply mount Passport's `authenticate()` middleware at the login route.

    app.get('/login', function(req, res) {
      res.render('login');
    });

    app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));
    
Upon log in, Passport will notice the `returnTo` URL saved in the session and
redirect the user back to `/settings`.

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/connect-ensure-login.png)](http://travis-ci.org/jaredhanson/connect-ensure-login)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
