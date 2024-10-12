import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState('en');

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const changeLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage login={login} isAuthenticated={isAuthenticated} language={language} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DashboardPage logout={logout} changeLanguage={changeLanguage} language={language} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
