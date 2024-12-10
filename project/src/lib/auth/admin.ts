import { config } from '../config';
import { supabase } from '../supabase';

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
  return email === config.admin.email && password === config.admin.password;
}

export async function getAdminSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export async function adminSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}