/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Resolver problemas com framer-motion no build
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'framer-motion': require.resolve('framer-motion'),
      };
      
      // Otimizações para vendor chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      };
    }

    return config;
  },
  
  // Configurações de output para produção
  output: 'standalone',
  
  // Configurações de transpilação
  transpilePackages: ['framer-motion'],
  
  // ESLint configuração
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuração
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig