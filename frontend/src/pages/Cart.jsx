import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useCart } from "../context/CartContext";
import "./Cart.css";


export default function Cart() {

    const { cart, updateQuantity, removeItem } = useCart();

    const navigate = useNavigate();


    const formatPrice = (price) => {
        return Number(price).toLocaleString("vi-VN") + "₫";
    };


    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.product.price) * item.quantity,
        0
    );


    return (

        <div className="home">


            <nav className="navbar">

                <div className="logo">
                    MyShop
                </div>


                <Link to="/" className="back-btn">
                    Home
                </Link>

            </nav>



            <section className="cart-container">


                <h1 className="cart-title">
                    Giỏ hàng
                </h1>



                {
                    cart.length === 0 ? (

                        <div className="empty-cart">

                            <h2>
                                Chưa có sản phẩm
                            </h2>

                            <Link 
                                to="/"
                                className="checkout-btn"
                            >
                                Mua sắm
                            </Link>

                        </div>


                    ) : (


                        <>


                            <div className="cart-list">


                                {
                                    cart.map(item => (

                                        <div 
                                            className="cart-item"
                                            key={item.product.id}
                                        >


                                            <img
                                                className="cart-image"
                                                src={item.product.image}
                                                alt={item.product.name}
                                            />



                                            <div className="cart-info">


                                                <h3>
                                                    {item.product.name}
                                                </h3>


                                                <p className="cart-price">
                                                    {formatPrice(item.product.price)}
                                                </p>


                                            </div>




                                            <div className="quantity-box">


                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>



                                                <span className="quantity-number">
                                                    {item.quantity}
                                                </span>



                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>


                                            </div>




                                            <button
                                                className="remove-btn"
                                                onClick={() =>
                                                    removeItem(item.product.id)
                                                }
                                            >
                                                Xóa
                                            </button>


                                        </div>


                                    ))
                                }


                            </div>





                            <div className="cart-summary">


                                <h2 className="cart-total">

                                    Tổng:
                                    {" "}
                                    {formatPrice(total)}

                                </h2>



                                <button
                                    className="checkout-btn"
                                    onClick={() =>
                                        navigate("/checkout")
                                    }
                                >
                                    Thanh toán
                                </button>


                            </div>


                        </>

                    )
                }


            </section>


        </div>

    );

}