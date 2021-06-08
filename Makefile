dockerdev:
	cd infra/docker && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

down:
	cd infra/docker && docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v