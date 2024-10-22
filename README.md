## Getting Started

Check out the env.template to make sure you have all .env entries that you need, if you are using webstorm you also need to add these to your
Jest tests when the time comes.

Make sure those are gitignore

## Prisma
Whatever DATABASE_URL is in your env.template needs to exist on your local postgres AND make sure it's in a .env NOT JUST .env.local


### Migrate DB
```
prisma migrate dev
prisma generate
```

### Test DB

Copy and paste your working .env.local and make a .env.test, this will be your test information
```
yarn migrate:test
yarn seed:test
```

Running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Testing
FYI, integration tests are located within the `__tests__` directory to circumvent Next.js automated routing. Other unit tests are located in the directory that corresponds to what they are testing.


NextJS default readme pass this line
------------------------
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
