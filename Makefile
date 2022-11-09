build: build-v1-v2 build-v4
	find dist/

v4_out/output.js: v4_js/input.js v4_js/maze.svelte
	npm run rollup

build-v4: v4_out/output.js
	(cd gen && go build)
	./gen/gen v4

build-v1-v2:
	npm install
	./build.sh

test:
	(cd gen && go test -v)