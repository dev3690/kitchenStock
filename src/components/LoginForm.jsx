import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { loginApi, callAxiosApi } from "../api_utils";

function LoginForm({ language }) {
  const [mobile, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      // const response = await callAxiosApi(loginApi, { mobile, password });
      // const { token, isMaster } = response.data.data;
      // login(token, isMaster);
      if (mobile === "admin" && password === "123") {
        navigate("/dashboard");
      }else{
          alert("Invalid credentials");

      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-icon">
          <h1>Login Page </h1>
          {/* <img
            src="/assets/laptop_image1.png"
            style={{ alignItems: "center" }}
            alt="Laptop Image"
            height={200}
            width={200}
          /> */}
          <p style={{fontSize: "20px"}}>  Please enter your Mobile and Password to Continue</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              style={{ fontSize: "1rem", borderRadius: "5px" }}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="input-icon">
              <img
                src="/assets/user.png"
                alt="User Icon"
                height={20}
                width={20}
              />  
            </span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              style={{ fontSize: "1rem", borderRadius: "5px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">
              <img
                src="/assets/lock.png"
                alt="Lock Icon"
                height={20}
                width={20}
              />
            </span>
          </div>
          <button type="submit" className="login-submit-button" style={{ fontSize: "1rem", borderRadius: "5px" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
