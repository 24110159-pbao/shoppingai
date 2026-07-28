import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    alert("Đăng xuất thành công");

    navigate("/login");
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">MyShop</div>

        <Link to="/" className="back-btn">
          Home
        </Link>
      </nav>

      <section className="banner">
        <div className="banner-content">
          <h1>Thông tin cá nhân</h1>

          <p>Trang Profile.</p>

          <button onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </section>
    </div>
  );
}