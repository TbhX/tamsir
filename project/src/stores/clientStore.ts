import { create } from 'zustand';
import { signIn, type User } from '../lib/auth';
import { query } from '../lib/db/mysql';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  created_at: string;
}

interface ClientState {
  user: User | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  fetchProjects: () => Promise<void>;
  getCurrentProject: () => Project | null;
}

export const useClientStore = create<ClientState>((set, get) => ({
  user: null,
  projects: [],
  loading: false,
  error: null,
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const user = await signIn(email, password);
      if (user.role !== 'client') {
        throw new Error('Invalid account type');
      }
      set({ user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Authentication failed',
        loading: false 
      });
    }
  },
  signOut: () => {
    set({ user: null, projects: [], error: null });
  },
  fetchProjects: async () => {
    const { user } = get();
    if (!user) return;

    set({ loading: true });
    try {
      const projects = await query<Project[]>(
        'SELECT * FROM projects WHERE client_id = ? ORDER BY created_at DESC',
        [user.id]
      );
      set({ projects, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
        loading: false 
      });
    }
  },
  getCurrentProject: () => {
    const { projects } = get();
    return projects.find(p => p.status === 'active') || null;
  },
}));