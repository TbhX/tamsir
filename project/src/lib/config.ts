import { z } from 'zod';

const envSchema = z.object({
  VITE_MYSQL_HOST: z.string(),
  VITE_MYSQL_USER: z.string(),
  VITE_MYSQL_PASSWORD: z.string(),
  VITE_MYSQL_DATABASE: z.string(),
  VITE_ADMIN_EMAIL: z.string().email(),
  VITE_ADMIN_PASSWORD: z.string().min(4),
  VITE_HCAPTCHA_SITE_KEY: z.string().min(1),
  VITE_HCAPTCHA_SECRET_KEY: z.string().min(1),
});

function validateEnv() {
  const env = {
    VITE_MYSQL_HOST: import.meta.env.VITE_MYSQL_HOST || 'localhost',
    VITE_MYSQL_USER: import.meta.env.VITE_MYSQL_USER || 'root',
    VITE_MYSQL_PASSWORD: import.meta.env.VITE_MYSQL_PASSWORD || '',
    VITE_MYSQL_DATABASE: import.meta.env.VITE_MYSQL_DATABASE || 'portfolio_db',
    VITE_ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL || 'admin@tamsir.fr',
    VITE_ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'zeus',
    VITE_HCAPTCHA_SITE_KEY: import.meta.env.VITE_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001',
    VITE_HCAPTCHA_SECRET_KEY: import.meta.env.VITE_HCAPTCHA_SECRET_KEY || 'test-key',
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment configuration');
  }
}

const env = validateEnv();

export const config = {
  mysql: {
    host: env.VITE_MYSQL_HOST,
    user: env.VITE_MYSQL_USER,
    password: env.VITE_MYSQL_PASSWORD,
    database: env.VITE_MYSQL_DATABASE,
  },
  admin: {
    email: env.VITE_ADMIN_EMAIL,
    password: env.VITE_ADMIN_PASSWORD,
  },
  hcaptcha: {
    siteKey: env.VITE_HCAPTCHA_SITE_KEY,
    secretKey: env.VITE_HCAPTCHA_SECRET_KEY,
  },
} as const;