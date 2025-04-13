module.exports = {
  apps: [
    {
      name: 'vite-app',
      script: 'serve',
      args: 'dist --single --listen 3000',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
