build: build-v1-v3 build-v4 
	find dist/

build-v4:
	(cd gen && go build)
	./gen/gen v4

build-v1-v3:
	npm install
	./build.sh
	(cd v3 && npm install && npm run build)
