// jsx:src/pages/LoginPage.jsx
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginPage({ language }) {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="login-container">
            <div className="login-image">
                <img src="src\assets\annakoot_photo.jpg" alt="Decorative temple" />
            </div>
            <div className="login-form-container">
                <LoginForm language={language} />
            </div>
        </div>  
    );
}

export default LoginPage;
