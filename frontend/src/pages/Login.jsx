import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8080/shoppingai/auth/login",
        {
          username,
          password,
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );


      alert("Đăng nhập thành công");

      navigate("/");

    } catch (err) {

      console.error(err);

      alert("Sai tài khoản hoặc mật khẩu");

    }

  };


  return (
      <div className="auth-page">

          <div className="auth-card">

              <h2>Đăng nhập</h2>

              <input
                  className="auth-input"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
              />

              <input
                  className="auth-input"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
              />

              <button
                  className="auth-btn"
                  onClick={handleLogin}
              >
                  Đăng nhập
              </button>

              <button
                  className="auth-link"
                  onClick={()=>navigate("/register")}
              >
                  Đăng ký
              </button>

          </div>

      </div>
  );
}