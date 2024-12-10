import { supabase } from '../supabase';
import type { ClientUser } from '../../types/client';

export async function clientSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function getClientProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data as ClientUser;
}

export async function clientSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}