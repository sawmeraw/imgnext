/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "**",
            }
        ],
        unoptimized: true,
    },
    async headers(){
        return [
            {
                source: '/_next/:path*',
                headers:[
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=315600, must-revalidate',
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
