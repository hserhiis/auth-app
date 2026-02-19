This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 🐳 Running PostgreSQL with Docker

To run the database locally without installing PostgreSQL on your macOS, use Docker.

### 1. Create a `docker-compose.yml`
Create a file named `docker-compose.yml` in your root directory:

```yaml
services:
  db:
    image: postgres:15
    container_name: nextjs_db
    restart: always
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
Start the Database
Run this command to start the container in the background:
```bash
docker-compose up -d
```
## Setting up Drizzle ORM
### Environment Variables
Create a .env file and add your connection string:
```bash
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydatabase
```
## Drizzle Commands
### Add these scripts to your package.json to manage your database:
```bash
"scripts": {
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio"
}
```
npm run db:generate: Creates SQL migration files based on your schema.

npm run db:migrate: Applies those migrations to your Docker database.

npm run db:studio: Opens a GUI in your browser to view your data.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# 🛠 Troubleshooting: Running on Apple Silicon (M1/M2/M3)

If you encounter an error like `segment '__TEXT' load command content extends beyond end of file` or `turbo.createProject is not supported by the wasm bindings`, it means the SWC binary is corrupted or incompatible with your architecture.

Follow these steps to fix it:

---

### 1. Total Cleanup (Recommended)
Sometimes a simple `npm install` isn't enough because corrupted binaries stay in the cache. Run the following commands in your terminal:

```bash
# 1. Remove node_modules, lock files, and build cache
rm -rf node_modules package-lock.json .next

# 2. Force clean npm cache to remove corrupted binaries
npm cache clean --force

# 3. Checking the current architecture
node -p "process.arch"

# 4. Installing specific binary codes for Apple Silicon
npm install @next/swc-darwin-arm64

# 5. Reinstall all dependencies from scratch
npm install

# 6. Running the development server
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
