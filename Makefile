NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/connect-ensure-login/*.js
	dox \
		--title connect-ensure-login \
		--desc "Login session ensuring middleware for Connect" \
		$(shell find lib/connect-ensure-login/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
