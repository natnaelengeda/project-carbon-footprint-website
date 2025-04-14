module.exports = {
  apps: [
    {
      name: "carbonfootprint-app",
      script: "serve ./dist --single --listen 4040",
      // args: 'dist --single --listen 3000',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "development",
      },
    },
  ],
}
