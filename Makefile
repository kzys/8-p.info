build:
	npm install
	./build.sh
	(cd v3 && npm install && npm run build)
