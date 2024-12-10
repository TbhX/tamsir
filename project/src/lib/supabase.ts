import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// Validate Supabase configuration
if (!config.supabase.url.startsWith('https://')) {
  throw new Error('Invalid Supabase URL format. Must start with https://');
}

if (!config.supabase.anonKey) {
  throw new Error('Missing Supabase anonymous key');
}

// Create Supabase client with validated configuration
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    db: {
      schema: 'public',
    },
  }
);

// Export admin credentials
export const ADMIN_EMAIL = config.admin.email;
export const ADMIN_PASSWORD = config.admin.password;