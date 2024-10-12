import { useState } from 'react';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'user' && password === 'password') {
            onLogin();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">

            <div className="login-form-container">
                <div className="login-icon">
                    <h1>Login Page</h1>
                    <img src="src\assets\laptop_image.jpg" alt="Laptop Image" height={200} width={200} />
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <span className="input-icon">👤</span>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="input-icon">🔒</span>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
