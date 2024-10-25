import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import ReportsPage from './pages/ReportsPage';
import './App.css';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isLoading, isAdmin } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  
   

  return children;
};

function App() {
  const [language, setLanguage] = useState('en');

  const changeLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage language={language} />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute className="dashboard-page">
                <DashboardPage className="dashboard-page" changeLanguage={changeLanguage} language={language} />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/category/:id"
            element={
              // <ProtectedRoute>
                <CategoryDetailPage />
              //  </ProtectedRoute> 
            }
          />
          <Route
            path="/reports"
            element={
              <ReportsPage
                changeLanguage={changeLanguage}
                language={language}
              />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    //  </AuthProvider> 
  );
}

export default App;
