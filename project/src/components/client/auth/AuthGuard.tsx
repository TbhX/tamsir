import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientStore } from '../../../stores/clientStore';
import { supabase } from '../../../lib/supabase';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const { setUser } = useClientStore();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/client/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: profile.full_name,
          projects: [],
        });
      }
    };

    checkAuth();
  }, [navigate, setUser]);

  return <>{children}</>;
}