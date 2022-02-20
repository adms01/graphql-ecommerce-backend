## GraphQL E-commerce Backend Server

Basic e-commerce backend build with NestJS, GraphQL and TypeORM.

## Features

- Add new products to the store
- Retrieve a paginated list of all products in the store
- Get product by id
- Delete product by id
- Create an account, password is hashed
- Login with email and password
- Only authorised users with a valid jwt token can perform mutations
- Descriptive errors

## How to run this project?

```
1. docker compose up
2. yarn install
3. yarn run start:dev

```

## Testing

Two unit tests have been provided in products.service.spec.ts. If I had more time to understand TypeORM,
I would create a test database rather than mocking the db.

## What I learnt

Being used to Express, Rest and Knex, this task introduced me to three new technologies at once, namely NestJS, GraphQL and TypeORM.

The first hurdle was in understanding the paradigm shift from Rest to GraphQL, followed by
understanding how GraphQL works in the context of NestJS syntax, and Nests overlap of decorators with TypeORM.
