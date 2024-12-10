export interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  status: 'active' | 'completed' | 'pending';
  created_at: string;
}

export interface ClientUser {
  id: string;
  email: string;
  full_name: string;
  projects: Project[];
}