.PHONY: help image push build run lint lint-fix
.DEFAULT_GOAL := help

help: ## 💬 This help message :)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST)  | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

clean: ## 🧹 Clean
	@rm -rf pkg
	@rm -rf target
	@rm -rf dist

build: ## 🔨 Local build
	wasm-pack build --target web 

deploy: ## 📦 Build for deployment to in 'dist' folder
	wasm-pack build --release --target web 
	rm -rf dist
	mkdir -p dist
	cp -r web/* dist/
	cp pkg/rust_wasm_fractals.js dist/
	cp pkg/rust_wasm_fractals_bg.wasm dist/
	sed -i 's/..\/pkg\//.\//' dist/main.js
	sed -i 's/..\/pkg\//.\//' dist/fractal.js

pre-reqs: ## 🌌 Pre-reqs
	curl -s https://raw.githubusercontent.com/benc-uk/tools-install/master/rust.sh | bash
	curl -s https://raw.githubusercontent.com/benc-uk/tools-install/master/wasm-pack.sh | bash

