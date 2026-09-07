module.exports = {
  apps: [
    {
      name: 'arregla',
      cwd: '/var/www/arregla',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: '4006',
      },
      max_restarts: 10,
      restart_delay: 3000,
      max_memory_restart: '512M',
    },
  ],
};
