const vows = require("vows");
const assert = require("assert");
const login = require("index");

vows
  .describe("connect-ensure-login")
  .addBatch({
    module: {
      "should export ensureLoggedIn": function () {
        assert.isFunction(login.ensureLoggedIn);
        assert.strictEqual(login.ensureLoggedIn, login.ensureAuthenticated);
      },

      "should export ensureLoggedOut": function () {
        assert.isFunction(login.ensureLoggedOut);
        assert.strictEqual(login.ensureLoggedOut, login.ensureNotLoggedIn);
        assert.strictEqual(login.ensureLoggedOut, login.ensureUnauthenticated);
        assert.strictEqual(login.ensureLoggedOut, login.ensureNotAuthenticated);
      },
    },
  })
  .export(module);
