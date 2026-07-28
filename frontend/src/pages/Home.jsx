import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";


const products = [
  {
    id:1,
    name:"iPhone 16 Pro",
    price:"28.990.000₫",
    image:"https://picsum.photos/400/400?1",
    rating:4.9
  },
  {
    id:2,
    name:"AirPods Pro",
    price:"5.990.000₫",
    image:"https://picsum.photos/400/400?2",
    rating:4.8
  },
  {
    id:3,
    name:"MacBook Pro",
    price:"45.990.000₫",
    image:"https://picsum.photos/400/400?3",
    rating:5.0
  },
  {
    id:4,
    name:"Apple Watch",
    price:"9.990.000₫",
    image:"https://picsum.photos/400/400?4",
    rating:4.7
  }
];


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



  return (

    <div className="Home">


      <nav className="navbar">


        <div className="logo">
          MyShop
        </div>


        <input
          className="search"
          placeholder="Tìm kiếm sản phẩm..."
        />



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
              <Link to="/ai">
                <button>
                  🤖
                </button>
              </Link>
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

        <button className="active">
          Tất cả
        </button>

        <button>
          Điện thoại
        </button>

        <button>
          Laptop
        </button>

        <button>
          Tai nghe
        </button>

        <button>
          Đồng hồ
        </button>

      </section>




      <section className="products">


        <h2>
          Sản phẩm nổi bật
        </h2>


        <div className="product-grid">


          {
            products.map(item=>(

              <div 
                className="card"
                key={item.id}
              >


                <img
                  src={item.image}
                  alt={item.name}
                />


                <div className="card-body">


                  <h3>
                    {item.name}
                  </h3>


                  <span className="rating">
                    ⭐ {item.rating}
                  </span>


                  <h4>
                    {item.price}
                  </h4>


                  <Link to={`/product/${item.id}`}>
                    <button>
                      Mua ngay
                    </button>
                  </Link>


                </div>


              </div>

            ))
          }


        </div>


      </section>


    </div>

  );

}