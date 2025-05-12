import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
    formats: ["image/webp"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
