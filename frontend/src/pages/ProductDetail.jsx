import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";
export default function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/shoppingai/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.result);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const formatPrice = (price) => {
        return Number(price).toLocaleString("vi-VN") + "₫";
    };

    if (loading) {
        return <h2>Đang tải...</h2>;
    }

    if (!product) {
        return <h2>Không tìm thấy sản phẩm</h2>;
    }

    return (
        <div className="product-detail">

            <Link to="/" className="back-btn">
                Home
            </Link>

            <div className="detail-container">

                <div className="detail-image">
                    <img src={product.image} alt={product.name}/>
                </div>

                <div className="detail-info">

                    <h1>{product.name}</h1>

                    <span className="detail-category">
                        {product.categoryName}
                    </span>

                    <div className="detail-price">
                        {formatPrice(product.price)}
                    </div>

                    <div className="detail-stock">
                        Còn {product.quantity} sản phẩm
                    </div>

                    <p className="detail-description">
                        Đây là sản phẩm chính hãng với chất lượng cao, bảo hành đầy đủ.
                        Bạn có thể thêm mô tả từ backend sau này.
                    </p>

                    <div className="detail-actions">
                        <button className="buy-btn">
                            Mua ngay
                        </button>

                        <button className="cart-btn">
                            Thêm vào giỏ
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}