import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LandingHero } from './components/LandingHero';
import { MainDemo } from './components/MainDemo';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import APIPage from './components/APIPage';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import Navigation from './components/Navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Brain, Menu, X, User } from 'lucide-react';
import AdminPanel from './components/AdminPanel';
import { Navigate } from 'react-router-dom';
import { FeatureComparison } from './components/FeatureComparison';

function App() {
  return (
    <AuthProvider>
      <Router>
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
                  <PricingSection />
                  <Footer />
                </>
              }
            />
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
            <Route
              path="/admin"
              element={<AdminRoute />}
            />
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

export default App;