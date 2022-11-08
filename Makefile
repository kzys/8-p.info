build: build-v1-v3 build-v4 
	find dist/

v4_out/output.js: v4_js/input.js v4_js/maze.svelte
	npm run rollup

build-v4: v4_out/output.js
	(cd gen && go build)
	./gen/gen v4

build-v1-v3:
	npm install
	./build.sh
	(cd v3 && npm install && npm run build)

test:
	(cd gen && go test -v)