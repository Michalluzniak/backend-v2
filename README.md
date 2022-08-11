# Zaven Bootcamp Users API

This repository contains API applications dedicated for managing (creating/modifying/removing) users.

It's an Open API based on in-memory persistence for the frontend developers training purposes.

---

## Documentation
API exposes a swagger documentation under `/docs` path.

--- 
## Building and running

### Prerequisites
- Node.js (version >= 14, except for v13)
- NVM (Node Version Manager)

### Local environment

```sh
$ nvm use                      # Use correct version of Node.js
$ npm ci                       # Install dependencies
$ npm run-script start:dev     # Run application in the hot-reload mode
```

### Host environment

```sh
$ nvm use                      # Use correct version of Node.js
$ npm ci                       # Install dependencies
$ npm run-script build         # Build the application
$ npm run-script start:prod    # Run application in the production mode
```

It is recommended to build a Docker image to host the application using Docker Engine.

```sh
$ docker build -t $DOCKER_REGISTRY_HOST/zaven-bootcamp-users-api:$APP_VERSION .
$ docker push $DOCKER_REGISTRY_HOST/zaven-bootcamp-users-api:$APP_VERSION
```


## Seeds

All seeds are controlled by environment variables. If you don't have `.env` file, create it in the root project folder.

Below is the list of available seeds and configuration

- `SEED_USERS_COUNT` - Set this variable to generate number of random users while starting application

## Contributing

Feel free to contribute this project. 

Just remember to follow:
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines
- [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) guidelines
- Linting rules defined for this project
