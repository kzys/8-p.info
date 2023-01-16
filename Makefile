build: build-v1-v2 build-v4
	find dist/

v4/out/output.js: v4/js/input.js v4/js/maze.svelte
	npm run rollup

build-v4: v4/out/output.js
	(cd gen && go build)
	./gen/gen v4/src

build-v1-v2:
	npm install
	./build.sh

test:
	(cd gen && go test -v)

fmt:
	npx prettier --write  v4/js/*.*

resume.pdf: build-v4
	wkhtmltopdf http://localhost:8000/me/resume.html resume.pdf
