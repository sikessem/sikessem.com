.PHONY: env install check serve

.env: .env.example
	cp .env.example .env

backend/.env: .env
	ln -s .env backend/.env

frontend/.env: .env
	ln -s .env frontend/.env

env: backend/.env frontend/.env

install: node_modules bun.lockb

node_modules: package.json
	bun install

bun.lockb: package.json
	bun update

check: install
	bun check

serve: install
	bun serve
