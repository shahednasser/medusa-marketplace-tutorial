# Medusa Marketplace Tutorial

> The code for this tutorial at the moment only supports Medusa v1.3.1 and Medusa Extender v1.7.2

Code for Medusa Marketplace Tutorial using [Medusa Extender](https://github.com/adrien2p/medusa-extender).

This includes the full Medusa server. If you want to install the marketplace into an existing Medusa server, please check out the [Medusa Marketplace plugin](https://github.com/shahednasser/medusa-marketplace) instead.

## Prerequisites

Before you run this code you'll need [PostgreSQL](https://www.postgresql.org/download/) and [Redis](https://redis.io/download) installed.

## Installation

After cloning the repository, install the dependencies:

```bash
npm i
```

## Configuration

Copy `.env.example` to `.env` and add your database and Redis configurations as necessary.

## Seed and Migrate Database

Run the following command to seed the database:

```bash
npm run seed
```

Before running migrations, make sure to run the build command:

```bash
npm run build
```

Then run the migrations

```bash
./node_modules/.bin/medex migrate --run
```

## Running the Server

To run the server run the following command:

```bash
npm start
```
