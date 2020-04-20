module.exports = {
  apps: [
    {
      name: 'hodgepodge',
      instances: '1',
      exec_mode: 'cluster',
      script: './dist/index.js',
      merge_logs: true,
      restart_delay: 5000,
      wait_ready: true,
      env: {
        watch: false,
        autorestart: true,
      },
      env_production: {
        EFF_NODE_CONFIG_ENV: 'production',
      },
      env_development: {
        EFF_NODE_CONFIG_ENV: 'development',
      },
    },
  ],
}
