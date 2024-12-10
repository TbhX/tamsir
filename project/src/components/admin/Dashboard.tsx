import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Folder, MessageSquare, Users, Plus, Trash2, Edit } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, checkUser } = useAuthStore();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchPortfolioItems();
  }, [checkUser]);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
    }
  };

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/portfolio/new')}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouveau Projet
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <DashboardCard
            title="Projets"
            count={portfolioItems.length}
            icon={Folder}
            onClick={() => navigate('/admin/projects')}
          />
          <DashboardCard
            title="Messages"
            count={0}
            icon={MessageSquare}
            onClick={() => navigate('/admin/messages')}
          />
          <DashboardCard
            title="Clients"
            count={0}
            icon={Users}
            onClick={() => navigate('/admin/clients')}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Portfolio</h2>
          </div>
          
          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-20 bg-slate-100 rounded" />
                ))}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {portfolioItems.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/admin/portfolio/${item.id}/edit`)}
                      className="p-2 text-slate-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  count: number;
  icon: any;
  onClick: () => void;
}

function DashboardCard({ title, count, icon: Icon, onClick }: DashboardCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{count}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-900" />
        </div>
      </div>
    </motion.button>
  );
}