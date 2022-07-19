module.exports = {
    context: 'assets',
    entry: {
      styles: './styles/main.scss',
      scripts: './scripts/main.js',
    },
    devtool: 'cheap-module-eval-source-map',
    outputFolder: '../assets',
    publicFolder: 'assets',
    proxyTarget: 'http://alisson.com',
    host: 'alisson.com',
    proxy: 'alisson.com', // or project.dev/app/
    port: 3000,
    watch: [
      '../**/*.php'
    ]
}