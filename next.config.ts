import { message } from "antd"
import { webpack } from "next/dist/compiled/webpack/webpack"

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: './dist',
    // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = {
    webpack: (config) => {
        config.ignoreWarnings = [
            {
                message: /PackFileCacheStrategy: Skipped not serializable cacgche item/,
            },
        ];
        return config;
    },
}

export default nextConfig