include docker/.env

.PHONY: up

default: up

up:
	@echo "Starting up containers for $(COMPOSE_PROJECT_NAME)..." 
	@docker compose -f docker/docker-compose.yml up
 	#queda en forwground intencionalmente

merge-18n:
	@docker compose -f docker/docker-compose.yml exec dspace-angular yarn --cwd scripts/ merge-i18n -s src/themes/cnea/assets/i18n

clean_node:
	@docker compose -f docker/docker-compose.yml exec dspace-angular yarn --cwd scripts/ clean

install:
	@docker compose -f docker/docker-compose.yml exec dspace-angular yarn --cwd scripts/ install
