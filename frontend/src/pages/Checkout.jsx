import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

export default function Checkout() {

    const navigate = useNavigate();
    const location = useLocation();
    const { cart, clearCart } = useCart();

    const [address, setAddress] = useState("");

    // Nếu là Mua ngay thì lấy từ state, nếu không thì lấy từ giỏ hàng
    const checkoutItems = useMemo(() => {
        return location.state?.items || cart;
    }, [location.state?.items, cart]);

    // Tính tổng tiền
    const totalAmount = useMemo(() => {
        return checkoutItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
    }, [checkoutItems]);

    const handlePlaceOrder = async () => {

        if (!address.trim()) {
            alert("Vui lòng nhập địa chỉ giao hàng");
            return;
        }

        try {

            const request = {

                address,

                items: checkoutItems.map(item => ({

                    productId: item.product.id,

                    quantity: item.quantity

                }))

            };

            const response = await axiosClient.post("/orders",request);

            alert(response.data.message);

            if (!location.state?.items) {
                clearCart();
            }

            navigate("/");

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Đặt hàng thất bại"
            );

        }

    };

    if (checkoutItems.length === 0) {

        return (

            <div style={{ padding: "20px", textAlign: "center" }}>

                <h1>Checkout</h1>

                <p>Không có sản phẩm nào trong danh sách thanh toán.</p>

                <button onClick={() => navigate("/")}>
                    Quay lại mua sắm
                </button>

            </div>

        );

    }

    return (

        <div className="checkout-container">

            <h1 className="checkout-title">

                Thanh toán

            </h1>

            <div className="checkout-list">

                {
                    checkoutItems.map(item => (

                        <div
                            className="checkout-item"
                            key={item.product.id}
                        >

                            <span className="checkout-product">

                                {item.product.name}

                            </span>

                            <span className="checkout-price">

                                {item.quantity}
                                {" x "}
                                {item.product.price.toLocaleString()}₫

                            </span>

                        </div>

                    ))
                }

            </div>

            <div style={{ marginTop: "20px" }}>

                <input
                    type="text"
                    placeholder="Nhập địa chỉ giao hàng"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "16px"
                    }}
                />

            </div>

            <h2 className="checkout-total">

                Tổng tiền:
                {" "}
                {totalAmount.toLocaleString()}₫

            </h2>

            <button
                className="checkout-confirm"
                onClick={handlePlaceOrder}
            >

                Xác nhận đặt hàng

            </button>

        </div>

    );

}