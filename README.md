# Medusa Marketplace Tutorial

Code for Medusa Marketplace Tutorial using [Medusa Extender](https://github.com/adrien2p/medusa-extender).

## Prerequisites

Before you run this code you'll need [PostgreSQL](https://www.postgresql.org/download/) and [Redis](https://redis.io/download) installed.

## Installation

After cloning the repository, install the dependencies:

```bash
npm i
```

## Configuration

If necessary, you can make changes to your `PostgreSQL` and `Redis` connection in by creating `.env` with the following keys:

```
REDIS_URL=
DATABASE_URL=
```

Note that by default these are the values used:

```
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgres://localhost/marketplace
```

### Running the Server

To run the server run the following command:

```
npm start
```