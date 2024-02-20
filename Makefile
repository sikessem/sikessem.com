# Make frontend

.PHONY: website/install website/check website/build

website/install: website/node_modules website/bun.lockb

website/node_modules: website/package.json
	deno task website:install

website/bun.lockb: website/package.json
	deno task website:update

website/check: website/install
	deno task website:check

website/build: website/install
	deno task website:build

# Make backend

.PHONY: website check apply start serve

website: website/build

apply: website
	deno task apply

check: website
	deno task check

start: website
	deno task start

serve: website
	deno task serve
