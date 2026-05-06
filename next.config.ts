import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/image/**',
            },
        ],
    },
    
    // SVGR config
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule: any) =>
        rule.test?.test?.('.svg'),
        );

        config.module.rules.push(
        {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, 
        },
        {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, 
            use: ['@svgr/webpack'],
        },
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },

    // Docs subdomain config
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/',
                    has: [{ type: 'host', value: 'docs.michas.dev' }],
                    destination: 'https://michaelcalb.github.io/docs/'
                }
            ],
            fallback: [
                {
                    source: '/:path*',
                    has: [{ type: 'host', value: 'docs.michas.dev' }],
                    destination: 'https://michaelcalb.github.io/docs/:path*'
                }
            ]
        }
    },
};

export default nextConfig;
