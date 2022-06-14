# Medusa Marketplace Tutorial

Code for Medusa Marketplace Tutorial using [Medusa Extender](https://github.com/adrien2p/medusa-extender).

This includes the full Medusa server. If you want to install the marketplace into an existing Medusa server, please check out the [Medusa Marketplace plugin](https://github.com/shahednasser/medusa-marketplace) instead.

## Prerequisites

Before you run this code you'll need [PostgreSQL](https://www.postgresql.org/download/) and [Redis](https://redis.io/download) installed.  You must also configure them as mentioned in the [set up development guide](https://docs.medusajs.com/tutorial/set-up-your-development-environment#configuring-your-server).

## Installation

After cloning the repository, install the dependencies:

```bash
npm i
```

## Configuration

Copy `.env.example` to `.env` and add your database and Redis configurations as necessary.

### Running the Server

To run the server run the following command:

```bash
npm start
```
