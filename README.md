# Zeply BTC

- Use correct nodejs version. You can check it in `.nvmrc` file. If you use nvm, just type `nvm use` to select it.
- Run `yarn` to install dependencies. If you use `npm`, you can run `npm install`.
- Run `yarn init:btc` to initialize database.

## Development server

Run `yarn start:btc:dev` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Production server

Run `yarn start:btc:prod` for a production server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Running tests

- Run `yarn test:all` to run all tests
- Run `yarn test:affected` to run tests only of affected codebase

## Linting

- Run `yarn lint:all` to lint everything
- Run `yarn lint:affected` to lint only affected codebase

## Understand this workspace

Run `yarn graph` to see a diagram of the dependencies of the projects.
