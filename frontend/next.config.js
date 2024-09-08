module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://18.196.61.213:8080/api/v1/:path*', // Proxy to Backend
        },
      ]
    },
  }
  