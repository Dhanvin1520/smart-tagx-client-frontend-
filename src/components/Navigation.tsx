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
  const [showMobileDashboard, setShowMobileDashboard] = useState(false);
  
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

  const handleMobileUserClick = () => {
    setShowMobileDashboard(!showMobileDashboard);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
        setShowMobileDashboard(false); // Also close mobile dashboard when closing menu
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full bg-white md:bg-background/95 backdrop-blur-sm border-b border-secondary-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-1 hover:bg-secondary-100 rounded-lg transition-colors">
                <img src="/logos/Smarttagx.png" alt="SmartTagX Logo" className="h-10 w-auto object-contain" />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
                    <span className="hidden lg:inline">{user?.name}</span>
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
              
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="mobile-menu-container md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-secondary-200 max-h-[calc(100vh-80px)] overflow-hidden">
              <div className="h-full overflow-y-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex flex-col space-y-6">
                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-2">
                      <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg">
                        Home
                      </Link>
                      <Link to="/features" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg">
                        Features
                      </Link>
                      <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg">
                        Pricing
                      </Link>
                      <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg">
                        FAQ
                      </Link>
                      <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg">
                        Contact
                      </Link>
                      {/* Temporarily hidden API link on mobile */}
                      {false && (
                        <Link to="/api" onClick={() => setMobileMenuOpen(false)} className="text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg">
                          API
                        </Link>
                      )}
                      {isAuthenticated && (user?.role === 'admin' || ((user?.email?.toLowerCase?.()?.replace(/\./g, '') === 'dhanvin699@gmail.com'))) && (
                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 transition-all duration-200 font-semibold py-3 px-4 rounded-lg">
                          Admin
                        </Link>
                      )}
                    </div>

                    {/* User Section */}
                    {isAuthenticated ? (
                      <div className="pt-6 border-t border-secondary-200">
                        <button
                          onClick={handleMobileUserClick}
                          className="flex items-center justify-between w-full p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <User className="w-6 h-6 text-blue-600" />
                            <span className="font-medium text-blue-700">{user?.name}</span>
                          </div>
                          <div className={`transform transition-transform ${showMobileDashboard ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        {showMobileDashboard && (
                          <div className="mt-4 bg-white rounded-lg border border-secondary-200 shadow-sm overflow-hidden">
                            <div className="max-h-[50vh] overflow-y-auto">
                              <div className="p-4">
                                <UserDashboard />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="pt-6 border-t border-secondary-200 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            handleAuthClick('login');
                            setMobileMenuOpen(false);
                          }}
                          className="flex-1 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50 transition-all duration-200 font-medium text-center py-3 px-4 rounded-lg border border-secondary-200"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            handleAuthClick('register');
                            setMobileMenuOpen(false);
                          }}
                          className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium shadow-md"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
