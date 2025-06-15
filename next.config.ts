import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    basePath: isProd ? "" : "",
    assetPrefix: isProd ? "/mjgwon24.github.io" : "",
    output: "export",
    images: {
        unoptimized: true
    }
};

export default nextConfig;
