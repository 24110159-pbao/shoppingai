import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./ProductManage.css";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function ProductManage() {


    const token = localStorage.getItem("token");


    let role = null;


    if(token){

        try{

            const payload = jwtDecode(token);

            role = payload.role;

        }
        catch(err){

            console.log("JWT lỗi");

        }

    }



    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);


    const [product, setProduct] = useState({

        name:"",
        price:"",
        quantity:"",
        categoryId:"",
        image:""

    });


    const [categories,setCategories] = useState([]);

    const [showCategory, setShowCategory] = useState(false);

    const [category, setCategory] = useState({
        name: ""
    });

    const [editingCategoryId, setEditingCategoryId] = useState(null);

    if(role !== "ADMIN"){

        return <Navigate to="/" replace />;

    }
    //============================
    // Load Product and Category
    //============================

    useEffect(() => {
        loadCategories();
        loadProducts();

    }, []);

    async function loadProducts(){

        try{

            setLoading(true);

            const res = await axiosClient.get(
                "/products"
            );

            setProducts(
                res.data.result
            );

        }
        catch(err){

            console.log(err);

        }
        finally{

            setLoading(false);

        }

    }

    async function loadCategories() {
        try {
            const res = await axiosClient.get("/categories");
            setCategories(res.data.result);
        } catch (err) {
            console.log(err);
        }
    }

    //============================
    // Reset Form
    //============================

    function resetForm() {

        setEditingId(null);

        setProduct({

            name: "",

            price: "",

            quantity: "",

            categoryId: "",

            image: ""

        });

    }

    //============================
    // Create
    //============================

    async function createProduct(){

        try{

            const res = await axiosClient.post(
                "/products",
                product
            );


            alert(
                res.data.message
            );


            loadProducts();

            resetForm();


        }
        catch(err){

            console.log(err);

            alert(
                "Thêm sản phẩm thất bại"
            );

        }

    }

    async function createCategory() {
        try {
            const res = await axiosClient.post("/categories", category);

            alert(res.data.message);

            setCategory({ name: "" });

            loadCategories();
        } catch (err) {
            alert("Thêm category thất bại");
        }
    }
        //============================
    // Update
    //============================

    async function updateProduct(){

        try{

            const res = await axiosClient.put(

                `/products/${editingId}`,

                product

            );


            alert(
                res.data.message
            );


            loadProducts();

            resetForm();


        }
        catch(err){

            console.log(err);

            alert(
                "Cập nhật thất bại"
            );

        }

    }

    async function updateCategory() {

        try {

            const res = await axiosClient.put(
                `/categories/${editingCategoryId}`,
                category
            );

            alert(res.data.message);

            setEditingCategoryId(null);

            setCategory({
                name: ""
            });

            loadCategories();

        } catch (err) {

            alert("Cập nhật category thất bại");

        }

    }
    //============================
    // Delete
    //============================

    async function deleteProduct(id){


        if(
            !window.confirm(
                "Bạn có chắc muốn xóa sản phẩm?"
            )
        ){

            return;

        }


        try{


            const res = await axiosClient.delete(

                `/products/${id}`

            );


            alert(
                res.data.message
            );


            loadProducts();


        }
        catch(err){

            console.log(err);

            alert(
                "Xóa thất bại"
            );

        }

    }

    async function deleteCategory(id) {

        try {
            if(!window.confirm("Xóa category?"))
                return;

            const res = await axiosClient.delete(
                `/categories/${id}`
            );

            alert(res.data.message);

            loadCategories();
        } catch (err) {
            alert("Xóa category thất bại");
        }
    }
    //============================
    // Edit
    //============================

    function editProduct(item) {

        setEditingId(item.id);

        setProduct({

            name: item.name,

            price: item.price,

            quantity: item.quantity,

            categoryId: item.categoryId,

            image: item.image

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    function editCategory(item) {
        setEditingCategoryId(item.id);

        setCategory({
            name: item.name
        });
    }
    //============================
    // View
    //============================

    return (

        <div className="product-manage">
            <nav className="navbar">

                <div className="logo">
                    MyShop
                </div>


                <Link 
                    to="/" 
                    className="back-btn"
                >
                    Home
                </Link>


            </nav>
            <h1>QUẢN LÝ SẢN PHẨM</h1>

            <button
                className="btn-category"
                onClick={() => setShowCategory(!showCategory)}
            >
                {showCategory ? "Ẩn quản lý Category" : "Quản lý Category"}
            </button>

            <h2>

                {

                    editingId == null

                        ?

                        "Thêm sản phẩm"

                        :

                        "Cập nhật sản phẩm"

                }

            </h2>

            <div className="product-form">

                <input

                    type="text"

                    placeholder="Tên sản phẩm"

                    value={product.name}

                    onChange={(e) =>

                        setProduct({

                            ...product,

                            name: e.target.value

                        })

                    }

                />

                <input

                    type="text"
                    
                    inputMode="numeric"

                    placeholder="Giá"

                    value={product.price}

                    onChange={(e) =>

                        setProduct({

                            ...product,

                            price: e.target.value

                        })

                    }

                />

                <input

                    type="text"

                    inputMode="numeric"

                    placeholder="Số lượng"

                    value={product.quantity}

                    onChange={(e)=>

                        setProduct({

                            ...product,

                            quantity:e.target.value.replace(/\D/g,"")

                        })

                    }

                />

                <select
                    value={product.categoryId}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            categoryId: e.target.value
                        })
                    }
                >
                    <option value="">-- Chọn Category --</option>

                    {categories.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>

                <input

                    type="text"

                    placeholder="Image URL"

                    value={product.image}

                    onChange={(e) =>

                        setProduct({

                            ...product,

                            image: e.target.value

                        })

                    }

                />

                <div className="form-buttons">

                    {

                        editingId == null

                            ?

                            <button

                                className="btn btn-add"

                                onClick={createProduct}

                            >

                                Thêm sản phẩm

                            </button>

                            :

                            <button

                                className="btn btn-update"

                                onClick={updateProduct}

                            >

                                Cập nhật

                            </button>

                    }

                    <button

                        className="btn btn-reset"

                        onClick={resetForm}

                    >

                        Reset

                    </button>

                </div>

            </div>
            {
                showCategory && (
                    <div className="category-manage">

                        <h2>Quản lý Category</h2>

                        <input
                            type="text"
                            placeholder="Tên category"
                            value={category.name}
                            onChange={(e) =>
                                setCategory({
                                    name: e.target.value
                                })
                            }
                        />

                        {
                            editingCategoryId === null ? (
                                <button onClick={createCategory}>
                                    Thêm
                                </button>
                            ) : (
                                <button onClick={updateCategory}>
                                    Cập nhật
                                </button>
                            )
                        }

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên Category</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <button onClick={() => editCategory(item)}>
                                                Sửa
                                            </button>

                                            <button onClick={() => deleteCategory(item.id)}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                )
            }
            <h2>Danh sách sản phẩm</h2>

            {

                loading

                    ?

                    <div className="loading">

                        Đang tải...

                    </div>

                    :

                    <div className="table-container">

                        <table className="product-table">

                            <thead>

                            <tr>

                                <th>ID</th>

                                <th>Ảnh</th>

                                <th>Tên</th>

                                <th>Danh mục</th>

                                <th>Giá</th>

                                <th>Số lượng</th>

                                <th>Thao tác</th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                products.map(item => (

                                    <tr key={item.id}>

                                        <td>

                                            {item.id}

                                        </td>

                                        <td>

                                            <img

                                                src={item.image}

                                                alt={item.name}

                                            />

                                        </td>

                                        <td>

                                            {item.name}

                                        </td>

                                        <td>

                                            {item.categoryName}

                                        </td>

                                        <td>

                                            {

                                                Number(item.price).toLocaleString("vi-VN")

                                            }₫

                                        </td>

                                        <td>

                                            {item.quantity}

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button

                                                    className="btn btn-edit"

                                                    onClick={() =>

                                                        editProduct(item)

                                                    }

                                                >

                                                    Sửa

                                                </button>

                                                <button

                                                    className="btn btn-delete"

                                                    onClick={() =>

                                                        deleteProduct(item.id)

                                                    }

                                                >

                                                    Xóa

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                            </tbody>

                        </table>

                    </div>
                    

            }

        </div>

    );

}