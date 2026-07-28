import { Link, useParams } from "react-router-dom";
import "../App.css";

export default function Product() {
  const { id } = useParams();

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
          <h1>Chi tiết sản phẩm</h1>

          <p>Sản phẩm có ID: {id}</p>

          <button>Thêm vào giỏ</button>
        </div>
      </section>

    </div>

  );
}