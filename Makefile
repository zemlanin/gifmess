browserify = $(shell npm bin)/browserify
node_static = $(shell npm bin)/static

SRC = $(wildcard src/*.js)
DIST = $(SRC:src/%.js=dist/%.js)

dist: $(DIST)
dist/%.js: src/%.js
	mkdir -p $(@D)
	$(browserify) $< -t babelify --outfile $@

.PHONY: serve
serve:
	@echo serving at http://localhost:8000
	@$(node_static) . -p 8000 -z > /dev/null
