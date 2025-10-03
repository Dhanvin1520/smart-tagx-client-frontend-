import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { LandingHero } from './components/LandingHero';
import { MainDemo } from './components/MainDemo';
import { FeaturesSection } from './components/FeaturesSection';
import PricingP from './components/PricingP';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import APIPage from './components/APIPage';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import Navigation from './components/Navigation';
import AdminPanel from './components/AdminPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { FeatureComparison } from './components/FeatureComparison';
import VerifyEmailPage from './components/VerifyEmailPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import SignupSuccessPage from './components/SignupSuccessPage';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <Navigation />

        {/* Page Routes */}
        <div className="pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LandingHero />
                  <FeatureComparison />
                  <MainDemo />
                  <Footer />
                </>
              }
            />
            <Route
              path="/features"
              element={
                <>
                  <FeaturesSection />
                  <Footer />
                </>
              }
            />
            <Route
              path="/pricing"
              element={
                <>
                  <PricingP />
                  <Footer />
                </>
              }
            />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/signup-success" element={<SignupSuccessPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route
              path="/faq"
              element={
                <>
                  <FAQSection />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <ContactSection />
                  <Footer />
                </>
              }
            />
            {false && (
              <Route
                path="/api"
                element={
                  <>
                    <APIPage />
                    <Footer />
                  </>
                }
              />
            )}
            {/* Open auth modal in login mode */}
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/admin" element={<AdminRoute />} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

// Admin route protection wrapper
function AdminRoute() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  const isEmailAdmin = user?.email?.toLowerCase?.()?.replace(/\./g, '') === 'dhanvin699@gmail.com';
  const isRoleAdmin = user?.role === 'admin';
  if (!isAuthenticated || !user || (!isRoleAdmin && !isEmailAdmin)) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <AdminPanel />
      <Footer />
    </>
  );
}

// Route that opens the Auth modal in login mode and redirects to home
function LoginRoute() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'login' } }));
  }, []);
  return <Navigate to="/" replace />;
}

export default App;