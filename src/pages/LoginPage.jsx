// jsx:src/pages/LoginPage.jsx
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

function LoginPage({ login, isAuthenticated }) {
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="login-container">
            <div className="login-image">
                {/* Replace with your actual image path */}
                <img src="src\assets\annakoot_photo.jpg" alt="Decorative temple" />
            </div>
            <div className="login-form-container">
                {/* <h1>Login Page</h1> */}
                <LoginForm onLogin={login} />
            </div>
        </div>  
    );
}

export default LoginPage;
