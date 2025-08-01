/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: './dist',
    // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    
    // Configuración para Firebase Auth
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups',
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'unsafe-none',
                    },
                ],
            },
        ];
    },
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