import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMainPage = location.pathname === '/';
  const currentPath = location.pathname.split('/').filter(Boolean);
  
  const getPageTitle = () => {
    switch (currentPath[0]) {
      case 'admin':
        return currentPath[1] === 'login' ? 'Administration' : 'Dashboard';
      case 'client':
        switch (currentPath[1]) {
          case 'login': return 'Connexion Client';
          case 'upload': return 'Upload de Fichiers';
          case 'chat': return 'Discussion';
          default: return 'Espace Client';
        }
      default:
        return '';
    }
  };

  if (isMainPage) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
              aria-label="Retour"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors"
              aria-label="Accueil"
            >
              <Home className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-lg font-medium text-slate-900">
            {getPageTitle()}
          </div>

          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>
    </motion.nav>
  );
}