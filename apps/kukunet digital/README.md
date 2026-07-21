# KUKUNET Digital — Docker Setup

All production containers live in this folder.

## Services

| Container | Image | Port (internal) | Description |
|---|---|---|---|
| `kukunet-postgres` | postgres:16-alpine | 5432 | PostgreSQL database |
| `kukunet-api` | local build | 3001 | NestJS REST API |
| `kukunet-web` | local build | 3000 | Next.js frontend |
| `kukunet-nginx` | nginx:1.27-alpine | **80** (host) | Reverse proxy |

## Folder Structure

```
kukunet digital/
├── Dockerfile.api        # NestJS multi-stage build
├── Dockerfile.web        # Next.js multi-stage build (standalone)
├── docker-compose.yml    # Orchestrates all 4 services
├── .env.example          # Copy to .env and fill in secrets
├── README.md             # This file
└── nginx/
    └── nginx.conf        # Reverse proxy config
```

## Quick Start

```bash
# 1. Enter this folder
cd "kukunet digital"

# 2. Create your env file and set real secrets
cp .env.example .env
nano .env

# 3. Build and start all containers
docker compose up --build -d

# 4. Run database migrations (first time only)
docker compose exec api node -e "require('./dist/src/db/migrate')"

# 5. Open the app
open http://localhost
```

## Useful Commands

```bash
# View logs for all services
docker compose logs -f

# Logs for a specific service
docker compose logs -f api

# Stop everything
docker compose down

# Stop and wipe the database volume
docker compose down -v

# Rebuild a single service
docker compose up --build -d web
```

## Routing (handled by Nginx)

| Path | Proxied to |
|---|---|
| `http://localhost/api/*` | `kukunet-api:3001/*` |
| `http://localhost/_next/static/*` | `kukunet-web:3000` (cached) |
| `http://localhost/*` | `kukunet-web:3000` |

## TLS / HTTPS

Uncomment the `443` port and the `server { listen 443 ... }` block in
`nginx/nginx.conf`, mount your certificates into `nginx/certs/`, and add
port `"443:443"` to the nginx service in `docker-compose.yml`.
