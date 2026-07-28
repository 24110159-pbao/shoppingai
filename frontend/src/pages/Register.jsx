import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/shoppingai/users/create",
        {
          username,
          password,
          fullName,
          email,
        }
      );

      console.log(res.data);

      if (res.data.code === "200") {
        alert("Tạo tài khoản thành công");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Tạo tài khoản thất bại");
    }
  };

    return (

    <div className="auth-page">

        <div className="auth-card">

            <h2>Đăng ký</h2>

            <input
                className="auth-input"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <input
                className="auth-input"
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
            />

            <input
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <button
                className="auth-btn"
                onClick={handleRegister}
            >
                Tạo tài khoản
            </button>

            <button
                className="auth-link"
                onClick={()=>navigate("/login")}
            >
                Quay lại đăng nhập
            </button>

        </div>

    </div>

    );
}
