# connect-ensure-login

This middleware ensures that a user is logged in.  If a request is received that
is unauthenticated, the request will be redirected to a login page.  The URL
will be saved in the session, so the user can be conveniently returned to the
page that was originally requested.

## Installation

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

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
