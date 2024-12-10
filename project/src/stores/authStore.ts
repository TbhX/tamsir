import { create } from 'zustand';
import { signIn, type User } from '../lib/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const user = await signIn(email, password);
      set({ user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Authentication failed',
        loading: false 
      });
    }
  },
  signOut: () => {
    set({ user: null, error: null });
  },
}));