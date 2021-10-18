.PHONY: help image push build run lint lint-fix
.DEFAULT_GOAL := help

help: ## This help message :)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST)  | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

lint: ## Lint & format, will not fix but sets exit code on error
	@echo "Not implemented yet!"; exit 1
	@$(GOLINT_PATH) > /dev/null || curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh
	cd $(SRC_DIR); $(GOLINT_PATH) run --modules-download-mode=mod *.go
	cd $(SRC_DIR); npm run lint

clean: ## 🧹 Clean
	@rm -rf pkg
	@rm -rf target

build: 
	wasm-pack build --target web