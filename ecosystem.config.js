module.exports = {
  apps : [{
    name: 'sikessem.com',
    interpreter: 'deno',
    interpreter_args: 'run -A',
    script: 'backend/start.ts',
    args: '',
    watch: true,
    autorestart: true,
    restart_delay: 1000,
    env_production: {
      NODE_ENV: 'production',
    },
    env_development: {
      NODE_ENV: 'development',
    },
  }],
};
