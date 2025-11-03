module.exports = {
  apps: [
    {
      name: "sliva-bot",
      script: "dist/index.js",   
      cwd: "/root/sliva-bot", 
      watch: false,
      env: {
        NODE_ENV: "production",
        BOT_TOKEN: "8005106256:AAEBBdjmpBvT3sDzqWB-6D7PoLduKptnn7Y"
      }
    }
  ]
};
