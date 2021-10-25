const vows = require("vows");
const assert = require("assert");
const util = require("util");
const ensureLoggedOut = require("ensureLoggedOut");

function MockRequest() {}

function MockResponse() {
  this.headers = {};
}

MockResponse.prototype.setHeader = function (name, value) {
  this.headers[name] = value;
};

MockResponse.prototype.redirect = function (location) {
  this._redirect = location;
  this.end();
};

MockResponse.prototype.end = function (data, encoding) {
  this._data += data;
  if (this.done) {
    this.done();
  }
};

vows
  .describe("ensureLoggedOut")
  .addBatch({
    "middleware with a url": {
      topic: function () {
        return ensureLoggedOut("/home");
      },

      "when handling a request that is authenticated": {
        topic: function (ensureLoggedOut) {
          const self = this;
          const req = new MockRequest();
          req.isAuthenticated = function () {
            return true;
          };
          const res = new MockResponse();
          res.done = function () {
            self.callback(null, req, res);
          };

          function next(err) {
            self.callback(new Error("should not be called"));
          }
          process.nextTick(function () {
            ensureLoggedOut(req, res, next);
          });
        },

        "should not error": function (err, req, res) {
          assert.isNull(err);
        },
        "should redirect": function (err, req, res) {
          assert.equal(res._redirect, "/home");
        },
      },

      "when handling a request that is not authenticated": {
        topic: function (ensureLoggedOut) {
          const self = this;
          const req = new MockRequest();
          req.isAuthenticated = function () {
            return false;
          };
          const res = new MockResponse();
          res.done = function () {
            self.callback(new Error("should not be called"));
          };

          function next(err) {
            self.callback(err, req, res);
          }
          process.nextTick(function () {
            ensureLoggedOut(req, res, next);
          });
        },

        "should not error": function (err, req, res) {
          assert.isNull(err);
        },
        "should not redirect": function (err, req, res) {
          assert.isUndefined(res._redirect);
        },
      },

      "when handling a request that lacks an isAuthenticated function": {
        topic: function (ensureLoggedOut) {
          const self = this;
          const req = new MockRequest();
          const res = new MockResponse();
          res.done = function () {
            self.callback(new Error("should not be called"));
          };

          function next(err) {
            self.callback(err, req, res);
          }
          process.nextTick(function () {
            ensureLoggedOut(req, res, next);
          });
        },

        "should not error": function (err, req, res) {
          assert.isNull(err);
        },
        "should not redirect": function (err, req, res) {
          assert.isUndefined(res._redirect);
        },
      },
    },

    "middleware with defaults": {
      topic: function () {
        return ensureLoggedOut();
      },

      "when handling a request that is authenticated": {
        topic: function (ensureLoggedOut) {
          const self = this;
          const req = new MockRequest();
          req.isAuthenticated = function () {
            return true;
          };
          const res = new MockResponse();
          res.done = function () {
            self.callback(null, req, res);
          };

          function next(err) {
            self.callback(new Error("should not be called"));
          }
          process.nextTick(function () {
            ensureLoggedOut(req, res, next);
          });
        },

        "should not error": function (err, req, res) {
          assert.isNull(err);
        },
        "should redirect": function (err, req, res) {
          assert.equal(res._redirect, "/");
        },
      },
    },
  })
  .export(module);
