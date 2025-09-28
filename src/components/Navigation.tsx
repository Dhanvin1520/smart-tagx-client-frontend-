import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserDashboard from './UserDashboard';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  
  const { user, isAuthenticated } = useAuth();

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Allow other components to open the modal via a custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { mode?: 'login' | 'register' } | undefined;
      setAuthMode(detail?.mode || 'login');
      setAuthModalOpen(true);
    };
    window.addEventListener('open-auth-modal', handler as EventListener);
    return () => window.removeEventListener('open-auth-modal', handler as EventListener);
  }, []);

  const handleUserClick = () => {
    setShowUserDashboard(!showUserDashboard);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-secondary-200 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1">
                <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <Link to="/" className="text-xl font-bold text-secondary-700">
      
                </Link>
                <p className="text-xs text-secondary-500"></p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                Home
              </Link>
              <Link to="/features" className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                Features
              </Link>
              <Link to="/pricing" className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                Pricing
              </Link>
              {/* Temporarily hidden API link */}
              {false && (
                <Link to="/api" className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                  API
                </Link>
              )}
              <Link to="/faq" className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                FAQ
              </Link>
              <Link to="/contact" className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                Contact
              </Link>
              {isAuthenticated && (user?.role === 'admin' || ((user?.email?.toLowerCase?.()?.replace(/\./g, '') === 'dhanvin699@gmail.com'))) && (
                <Link to="/admin" className="text-purple-700 hover:text-purple-900 transition-colors font-semibold">
                  Admin
                </Link>
              )}
              
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={handleUserClick}
                    className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </button>
                  
                  {showUserDashboard && (
                    <div className="absolute right-0 top-full mt-2 w-80 z-50">
                      <UserDashboard />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
              
              <Link to="/#demo" className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium">
                Demo
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-secondary-600 hover:text-secondary-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-secondary-200">
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                  Home
                </Link>
                <Link to="/features" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                  Features
                </Link>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                  Pricing
                </Link>
                {/* Temporarily hidden API link on mobile */}
                {false && (
                  <Link to="/api" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                    API
                  </Link>
                )}
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                  FAQ
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium">
                  Contact
                </Link>
                {isAuthenticated && (user?.role === 'admin' || ((user?.email?.toLowerCase?.()?.replace(/\./g, '') === 'dhanvin699@gmail.com'))) && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-purple-700 hover:text-purple-900 transition-colors font-semibold">
                    Admin
                  </Link>
                )}
                
                {isAuthenticated ? (
                  <div className="pt-2">
                    <div className="flex items-center space-x-2 text-blue-600 font-medium">
                      <User className="w-5 h-5" />
                      <span>{user?.name}</span>
                    </div>
                    <div className="mt-2">
                      <UserDashboard />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <button
                      onClick={() => {
                        handleAuthClick('login');
                        setMobileMenuOpen(false);
                      }}
                      className="text-secondary-600 hover:text-secondary-800 transition-colors font-medium text-left"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('register');
                        setMobileMenuOpen(false);
                      }}
                      className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium w-fit"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
                
                <Link to="/#demo" onClick={() => setMobileMenuOpen(false)} className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium w-fit">
                  Demo
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navigation;
