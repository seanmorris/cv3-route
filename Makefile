# .PHONY: test clean

# index.js: source/Router.js source/Path.js
# 	@ npm install \
# 	&& npm run build

# test:
# 	@ npm link cv3-inject \
# 	&& npm install \
# 	&& npm run build-test \
# 	&& node test.js

# clean:
# 	@ rm -rf node_modules *.js
.PHONY: build test install-dependencies update-dependencies clean audit audit-fix

NODE=docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine

build: source/Path.js source/Router.js
	@ ${NODE} \
		npm install -s \
		&& npx babel source --out-dir ./

test:
	@ ${NODE} \
		npm install -s \
		&& npx babel source test --out-dir ./ \
		&& node test.js

install-dependencies:
	@ ${NODE} \
		npm install

update-dependencies:
	@ ${NODE} \
		npm update

clean:
	@ ${NODE} \
		rm -rf node_modules *.js

audit:
	@ ${NODE} \
		npm audit

audit-fix:
	@ ${NODE} \
		npm audit fix
