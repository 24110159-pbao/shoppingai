import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "50px" }}>

      <h2>Đăng nhập</h2>


      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />


      <br/>
      <br/>


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />


      <br/>
      <br/>


      <button onClick={handleLogin}>
        Đăng nhập
      </button>


    </div>
  );
}