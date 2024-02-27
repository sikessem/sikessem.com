.PHONY: env install check serve

.env: .env.example
	cp .env.example .env

app/backend/.env: .env
	ln -s .env app/backend/.env

app/frontend/.env: .env
	ln -s .env app/frontend/.env

env: app/backend/.env app/frontend/.env

install: node_modules bun.lockb

node_modules: package.json
	bun install

bun.lockb: package.json
	bun update

check: install
	bun check

serve: install
	bun serve
