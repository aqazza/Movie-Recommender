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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

The easiest way to deploy your Next.js app is to use the [Netlify Platform](https://www.netlify.com/), which supports Next.js out of the box.

### Steps to Deploy on Netlify:

1. Go to [Netlify](https://www.netlify.com/) and sign up for an account if you don’t already have one.
2. In the Netlify dashboard, click on **"Add new site"** and select **"Import an existing project."**
3. Connect your GitHub, GitLab, or Bitbucket repository where your Next.js project is hosted.
4. In the **"Build Settings"**:
   - Set the build command to `npm run build` or `yarn build` depending on your package manager.
   - Set the publish directory to `.next` (for Next.js apps).
5. Click **Deploy** and Netlify will automatically build and deploy your app!

Check out the [Netlify deployment documentation](https://docs.netlify.com/integrations/frameworks/next-js) for more details.

