import { Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-900">BT</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Accueil', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}

            {user ? (
              <Link
                to="/admin/dashboard"
                className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/admin/login')}
                  className="inline-flex items-center text-slate-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin
                </button>
                <Link
                  to="/client/upload"
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  Espace Client
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-blue-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-100">
            {['Accueil', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-blue-900 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            
            {user ? (
              <Link
                to="/admin/dashboard"
                className="block w-full text-center bg-blue-900 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/admin/login');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full text-slate-600 hover:text-blue-900 px-3 py-2 text-base font-medium"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Admin
                </button>
                <Link
                  to="/client/upload"
                  className="block w-full text-center bg-blue-900 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-800 transition-colors mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Espace Client
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}