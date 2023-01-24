-include .env
export

IMAGE_NAME=ui-f1-registry
LATEST_COMMIT_HASH=$(shell git rev-parse --short HEAD)
ZIP_PATH=./out/$(IMAGE_NAME)-$(LATEST_COMMIT_HASH).zip

# Deployment -------------------------
##

zip-contents:
	@zip -r $(ZIP_PATH) ./out

upload-to-release:
	@gh release create [] $(ZIP_PATH) --draft --title "$(IMAGE_NAME)-$(LATEST_COMMIT_HASH)" --notes "" 

create-static-out: ## Manually create the static files
	@npm run build:static

zip-and-release-ui:
	@$(MAKE) zip-contents
	@$(MAKE) upload-to-release

# Setup and config -------------------------
##
npm-setup:
	@npm i -g next
	@npm ci
	@npm run prepare

## Running -------------------------
##
dev:
	@npm run dev

test:
	@npm run test:all