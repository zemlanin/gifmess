babel = $(shell npm bin)/babel
node_static = $(shell npm bin)/static

SRC = $(wildcard src/*.js)
DIST = $(SRC:src/%.js=dist/%.js)

dist: $(DIST)
dist/%.js: src/%.js
	mkdir -p $(@D)
	$(babel) $< -o $@

.PHONY: serve
serve:
	@echo serving at http://127.0.0.1:8000
	@$(node_static) . -p 8000 -z > /dev/null
