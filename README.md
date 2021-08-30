This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies

```bash
npm install
```

Then you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Layers Overview

1. Website - Components / Pages (React)
2. API - Controllers
3. Services - Business Logic (Most of the work is done here)
4. Database (Prisma)

## General Workflow

### Creating/Editing a database model

1. Open `prisma/schema.prisma`
2. Add/Update any schema
3. Save the file
4. Run `npm run gen:db`

### Create a new service

1. Create a new folder in `src/services/[service name]`
2. Create a new .ts file for each service action (e.g. get-movies.ts)
3. Write out the business logic in the action
4. Add the new file to the `index.ts` file
