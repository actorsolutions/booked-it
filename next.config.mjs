/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const configPWA = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL:  process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL:process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET:process.env.AUTH0_CLIENT_SECRET,
    AUTH0_HOOK_SECRET:process.env.AUTH0_HOOK_SECRET

  },
}

export default configPWA(nextConfig)


