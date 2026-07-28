import { Link } from "react-router-dom";
import "../App.css";

export default function Cart() {
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
          <h1>Giỏ hàng</h1>

          <p>Chưa có sản phẩm.</p>
        </div>
      </section>

    </div>
  );
}