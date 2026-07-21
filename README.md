# KUKUNET Digital

KUKUNET Digital is a desktop-first full-stack web platform with a premium animated marketing landing page, secure authentication flow, and an authenticated user dashboard.

This project is a monorepo consisting of:
- `apps/web`: Next.js frontend application
- `apps/api`: NestJS backend authentication API

## Prerequisites

- Node.js 18+
- PostgreSQL database

## Local Setup

1. **Install dependencies:**
   From the root of each app, run:
   ```bash
   cd apps/api
   npm install

   cd ../../apps/web
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment files and update them if necessary:
   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```
   *Note: Ensure your PostgreSQL instance is running and the `DATABASE_URL` in `apps/api/.env` is correct.*

3. **Database Migrations:**
   In the `apps/api` directory, run the following commands to generate and apply migrations using Drizzle ORM:
   ```bash
   cd apps/api
   npm run db:generate
   npm run db:migrate
   ```

4. **Running the Applications:**

   Start the NestJS backend (runs on port 3001 by default):
   ```bash
   cd apps/api
   npm run start:dev
   ```

   Start the Next.js frontend (runs on port 3000 by default):
   ```bash
   cd apps/web
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Architecture
- **Frontend**: Next.js App Router, Tailwind CSS, Server Actions.
- **Backend**: NestJS, Drizzle ORM, PostgreSQL, JWT Authentication.
