/** @type {import('next').NextConfig} */
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' }np
    }
  },  
  images: {
    loader: 'akamai',
    path: '',
  },

  rules: [{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      'file-loader',
      {
        loader: 'akamai',
        options: {
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
        },
      },
    ],
  }]

}
