.PHONY: help image push build run lint lint-fix
.DEFAULT_GOAL := help

help: ## 💬 This help message :)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST)  | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

clean: ## 🧹 Clean
	@rm -rf pkg
	@rm -rf target

build: ## 🔨 Build
	wasm-pack build --target web

pre-reqs: ## 🌌 Pre-reqs
	curl -s https://raw.githubusercontent.com/benc-uk/tools-install/master/wasm-pack.sh | bash