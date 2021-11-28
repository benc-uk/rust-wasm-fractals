.PHONY: help clean deploy build pre-reqs
.DEFAULT_GOAL := help

help: ## 💬 This help message :)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST)  | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

clean: ## 🧹 Clean
	@rm -rf pkg
	@rm -rf target
	@rm -rf dist
	@rm -rf node_modules

build: ## 🔨 Local build
	wasm-pack build --target web 

deploy: ## 📦 Build for deployment to in 'dist' folder
	wasm-pack build --release --target web 
	npm install esbuild --no-save --silent
	npm install @chialab/esbuild-plugin-html --no-save --silent
	node ./build.mjs

pre-reqs: ## 🌌 Pre-reqs
	curl -s https://raw.githubusercontent.com/benc-uk/tools-install/master/rust.sh | bash
	curl -s https://raw.githubusercontent.com/benc-uk/tools-install/master/wasm-pack.sh | bash
