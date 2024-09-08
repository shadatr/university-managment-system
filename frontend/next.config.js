module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://18.196.61.213:8080/api/:path*', // Proxy to Backend
        },
      ]
    },
  }
  