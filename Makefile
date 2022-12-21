-include .env
export

IMAGE_NAME=ui-f1-registry
LATEST_COMMIT_HASH=$(shell git rev-parse --short HEAD)

# Deployment -------------------------
##

zip-contents:
	@zip -r ./out/out.zip ./out

upload-to-s3:
	@aws s3 cp ./out/out.zip s3://$(IMAGE_NAME)/$(IMAGE_NAME)-$(LATEST_COMMIT_HASH)

zip-and-upload-ui:
	@$(MAKE) zip-contents
	@$(MAKE) upload-to-s3

# Setup and config -------------------------
##
create-static-out: ## Manually create the static files
	@npm run build:static