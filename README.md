# Paycheck Splitter
This is a React / Express app that may be part of a larger finance dashboard / budget tool

### Getting Started
Starting frontend
```
cd client
npm run dev
```

Starting backend
```
cd server
npm run dev
```

## Demo / prod

There is a demo and prod split. Each has its own env file and database.

Prod uses `.env.example`:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_tracker
CLIENT_PORT=8080
SERVER_PORT=8082
```

Demo uses `.env.demo.example`:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5433
DB_NAME=finance_tracker_demo
CLIENT_PORT=8090
SERVER_PORT=8091
```

Demo is on port `8090`.

## Docker

```bash
docker compose up -d --build
docker compose --env-file .env.demo -p finance-tracker-demo up -d --build
```
