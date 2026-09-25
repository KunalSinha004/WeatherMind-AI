import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { DashboardPage } from './pages/DashboardPage';
import { SearchPage } from './pages/SearchPage';
import { CityDetailsPage } from './pages/CityDetailsPage';
import { AIForecastPage } from './pages/AIForecastPage';
import { HistoricalAnalyticsPage } from './pages/HistoricalAnalyticsPage';
import { WeatherMapPage } from './pages/WeatherMapPage';
import { AlertsCenterPage } from './pages/AlertsCenterPage';
import { CompareCitiesPage } from './pages/CompareCitiesPage';
import { SavedLocationsPage } from './pages/SavedLocationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutAIModelPage } from './pages/AboutAIModelPage';
import { NotFoundPage } from './pages/NotFoundPage';

// React Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("WeatherMind App ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#0b0f19', color: '#f8fafc', padding: '2rem', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#06b6d4', fontSize: '1.5rem', fontWeight: 'bold' }}>WeatherMind AI — Application Recovery</h2>
          <p style={{ marginTop: '0.5rem', color: '#94a3b8' }}>An unexpected error occurred while rendering the page.</p>
          <pre style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem', overflowX: 'auto', fontSize: '0.8rem', color: '#f43f5e' }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
          <button
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#06b6d4', border: 'none', borderRadius: '0.5rem', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reset Session & Reload Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main Application Layout Shell
const AppLayout: React.FC = () => {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar onOpenAssistant={() => setAssistantOpen(true)} />

      <div className="flex flex-1">
        <Sidebar onOpenAssistant={() => setAssistantOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <Footer />

      <AIAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  );
};

// Admin Guard Route
const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Auth & Landing Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Authenticated Dashboard Shell Routes */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/city/:cityName" element={<CityDetailsPage />} />
                <Route path="/ai-forecast" element={<AIForecastPage />} />
                <Route path="/analytics" element={<HistoricalAnalyticsPage />} />
                <Route path="/map" element={<WeatherMapPage />} />
                <Route path="/alerts" element={<AlertsCenterPage />} />
                <Route path="/compare" element={<CompareCitiesPage />} />
                <Route path="/saved" element={<SavedLocationsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about-model" element={<AboutAIModelPage />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboardPage />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
