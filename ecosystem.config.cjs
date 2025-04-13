module.exports = {
  apps: [
    {
      name: "vite-app",
      script: "serve",
      args: "dist -s -l 3000",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
