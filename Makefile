SRC=index.js bin/component-score

lint:
	@./node_modules/.bin/jshint $(SRC)

.PHONY: lint
