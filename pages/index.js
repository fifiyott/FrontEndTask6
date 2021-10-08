import Head from 'next/head'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct, getProducts, deleteProduct } from "../redux/actions/actions";
import Styles from '../styles/Home.module.css'
import Products from "./products";
import Headers from "../components/header"
import Modal from "react-modal";
import EditProduct from "react-modal";

(Modal, EditProduct).setAppElement();


export default function HomeStore() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch()

  const[updateData, setUpdateData] = useState({id:null, status:false});

  const allProductsData = useSelector((state) => state.Products);

  const { loading, error, products } = allProductsData;

  const [ searchFilter, setSearchFilter ] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  
  const [formInput, setFormInput] = useState({
    title :"",
    price:"",
    description: "",
    image: "",
    category:"",
  });


  function handleChange(e){
    let dataList = {...formInput};
    dataList[e.target.name] = e.target.value;
    setFormInput(dataList);
  }  

function handleSubmit(e) {
  e.preventDefault();
  if (formInput.title === ""){
    return false;
  }
  if (formInput.price === ""){
    return false;
  }
  if (formInput.description === ""){
    return false;
  }
  if (formInput.image === ""){
    return false;
  }
  if (formInput.category === ""){
    return false;
  }

  if(updateData.status){
    dispatch(
      editProduct({
          title : formInput.title,
          price : formInput.price,
          description: formInput.description,
          image: formInput.image,
          category : formInput.category,
        }));
      alert("Data Berhasil Diedit..");
    }
    else{
    dispatch(
      addProduct({
        title: formInput.title,
        price : formInput.price,
        description: formInput.description,
        image: formInput.image,
        category : formInput.category,
      })
    );
    alert("Data Berhasil Tersimpan !");
  }
    setFormInput({title:"", price: "", description: "", image: "", category:""});
    setUpdateData({ id: null, status: false });
  };

  const handleEdit = (product) => {
    setFormInput({
      title: product.title,
      price : product.price,
      description : product.description,
      image : product.image,
      category : product.category,
    });
    setUpdateData({ id: product.id, status: true });
    console.log(product.id);
  };

  return (
   
    <div className='container'>
      <Head>
        <title>List Product</title>
        <meta name="keywords" content="list"></meta>
      </Head>

      <Headers />
      <div className="Header">
        <div className="Modal">
          <button onClick={() => setModalIsOpen(true)} className="btnAdd">
           Add Product
          </button>

          {/* ADD MODALNYA */}
          <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            style={{
              content: {
                top: "40px",
                left: "140px",
                right: "140px",
                bottom: "40px",
              },
            }}
          >
            <button
              onClick={() => setModalIsOpen(false)}
              style={{ float: "right" }}
              className="button-ud"
            >
              X
            </button>
            <section>
              <section>
                <h1> New Product </h1>
                <div >
                  <form id="form" className="form">
                  <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChange}
                        value={formInput.title} 
                        name="title"
                        className="input"
                        placeholder="Title" />
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChange}
                        value={formInput.price} 
                        name="price" 
                        className="input"
                        placeholder="Price"/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChange}
                        value={formInput.description} 
                        name="description" 
                        className="input"
                        placeholder="Description"/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChange}
                        value={formInput.image} 
                        name="image" 
                        className="input"
                        placeholder="Image"/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChange}
                        value={formInput.category} 
                        name="category"
                        className="input"
                        placeholder="Category" />
                    </div>

                    <div>
                      <button onClick={handleSubmit} type="submit" className="btnSubmit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </section>
            <br />
          </Modal>
        </div>
      </div>

      <section className="product">
      <div className="list-group">
        <div className="list-header">
            <h1 className="headerlist">List</h1>
            <div className="filter-post">
                <input type="text"
                    className="filter"
                    placeholder="Search"
                    onChange={ (e) => {
                    setSearchFilter(e.target.value);
                    } }
                />
            </div>
        </div>
      </div>
      {loading
        ? "Loading..."
        : error
        ? error.message
        : products
        .filter((val) => {
          if( searchFilter === "") {
            return val;
          } else if ( val.title.toLowerCase().includes(searchFilter.toLocaleLowerCase())) {
            return val;
          }
        }).map((product) => (
            <div className="flex-container">
            <div className="flex-left">
                <h3 key={product.id}>{product.title}</h3>
                <p>Rp. {product.price}</p>
                <div className="card-image">
                  <Image
                    src={product.image}
                    alt="An image of product"
                    width={200}
                    height={250}
                  />
                </div>
                <p>{product.description}</p>
                <p>{product.category}</p>
            </div>
            <div className="flex-right">
                <button className="btnEdit" onClick={() => setModalIsOpen(true) & handleEdit(product)}>Edit</button>
                {/* <button className="btnEdit" onClick={() => seteditModalIsOpen(true) & handleEdit(product)}>Edit</button> */}
                {/* <button className="btnDel" onClick={() => handleDelete(product.id)}>Delete</button> */}
                <button className="btnDel" onClick={() =>
                        dispatch(
                          deleteProduct(product.id),
                          alert("Anda Menghapus " + product.title)
                        )
                }>Delete</button>
            </div> 
            </div>
          ))}
    </section>

    {/* <Products handleEdit={handleEdit} /> */}
    </div>
   )
 }