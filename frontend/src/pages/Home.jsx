import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "../App.css";



export default function Home(){

  const token = localStorage.getItem("token");
  

  if(!token){
    return <Navigate to="/login" replace />;
  }


  let role = null;


  try{

    const payload = jwtDecode(token);

    console.log(payload);

    role = payload.role;
  

  }
  catch(err){

    console.log("JWT lỗi");

  }
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =useState(null);
  
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/shoppingai/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + "₫";
  };

  useEffect(() => {
    fetch("http://localhost:8080/shoppingai/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.result);
      })
      .catch(console.error);
  }, []);
  
  const filteredProducts = products.filter((product) => {

    const matchCategory =
      selectedCategory === null ||
      product.categoryId === selectedCategory;

    const matchSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });
        
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(result.slice(0, 5));
  }, [search, products]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Đang tải...</h2>;
  }
  return (

    <div className="Home">


      <nav className="navbar">


        <div className="logo">
          MyShop
        </div>


        <div className="search-box">

          <input
            className="search"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {suggestions.length > 0 && (
            <div className="suggestions">

              {suggestions.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="suggestion-item"
                >
                  {item.name}
                </Link>
              ))}

            </div>
          )}

        </div>


        <div className="nav-right">


          <Link to="/cart">
            <button>
              🛒
            </button>
          </Link>



          <Link to="/profile">
            <button>
              👤
            </button>
          </Link>



          {
            role === "ADMIN" &&
            (
              <>
                <Link to="/products/manage">
                    <button>📦</button>
                </Link>
                
                <Link to="/ai">
                  <button>
                    🤖
                  </button>
                </Link>
              </>


            )
          }


        </div>


      </nav>



      <section className="banner">

        <div className="banner-content">

          <h1>
            Summer Sale 2026
          </h1>

          <p>
            Giảm đến 50% toàn bộ sản phẩm.
          </p>

          <button>
            Mua ngay
          </button>

        </div>

      </section>
      

      <section className="categories">

        <button
          className={selectedCategory === null ? "active" : ""}
          onClick={() => setSelectedCategory(null)}
        >
          Tất cả
        </button>

        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? "active" : ""}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}

      </section>




      <section className="products">


        <h2>
          Sản phẩm nổi bật
        </h2>


        <div className="product-grid">
          {filteredProducts.map(item => (
            <div className="card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="card-body">

                <h3>{item.name}</h3>

                <p>Danh mục: {item.categoryName}</p>

                <p>Số lượng: {item.quantity}</p>

                <h4>{formatPrice(item.price)}</h4>

                <Link to={`/product/${item.id}`}>
                  <button>Mua ngay</button>
                </Link>

              </div>
            </div>
          ))}
        </div>


      </section>


    </div>

  );

}