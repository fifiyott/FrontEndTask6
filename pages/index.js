import Head from 'next/head'
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../redux/actions/actions";
import Styles from '../styles/Home.module.css'
import Products from "./products";
import Headers from "../components/header"
import Modal from "react-modal";
import EditProduct from "react-modal";



export default function HomeStore() {

  (Modal, EditProduct).setAppElement();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  const dispatch = useDispatch()

  const[updateData, setUpdateData] = useState({id:null, status:false});
  
  const [formInput, setFormInput] = useState({
    title :"",
    price:"",
    description: "",
    image: "",
    category:"",
  });

  const [formEdit, setFormEdit] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });



  function handleChange(e){
    let dataList = {...formInput};
    dataList[e.target.name] = e.target.value;
    setFormInput(dataList);
  }  

  const handleChangeEdit = (e) => {
    let data = { ...formEdit };
    data[e.target.name] = e.target.value;
    setFormEdit(data);
  };
  
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
          id : updateData.id,
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

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editProduct({
        // id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      })
    );

    setFormEdit({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
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
            {/* <section className="content-product">
              <section className="add-product"> */}
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


          {/* EDIT MODALNYA */}
          <EditProduct
            isOpen={editModalIsOpen}
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
              onClick={() => seteditModalIsOpen(false)}
              style={{ float: "right" }}
              className="button-ud"
            >
              X
            </button>
            <section>
              <section>
            {/* <section className="content-product">
              <section className="add-product"> */}
                <h1> Edit Product </h1>
                <div >
                  <form id="form" className="form">
                  <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChangeEdit}
                        value={formInput.title} 
                        name="title"
                        className="input"
                        placeholder="Title" />
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChangeEdit}
                        value={formInput.price} 
                        name="price" 
                        className="input"
                        placeholder="Price"/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChangeEdit}
                        value={formInput.description} 
                        name="description" 
                        className="input"
                        placeholder="Description"/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChangeEdit}
                        value={formInput.image} 
                        name="image" 
                        className="input"
                        placeholder="Image"/>
                    </div>
                    <div className="form-group">
                      <input 
                        type="input"  
                        onChange={handleChangeEdit}
                        value={formInput.category} 
                        name="category"
                        className="input"
                        placeholder="Category" />
                    </div>

                    <div>
                      <button onClick={handleUpdate} type="submit" className="btnSubmit">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </section>
            <br />
          </EditProduct>
        </div>
      </div>

    <Products handleEdit={handleEdit} editModalIsOpen={editModalIsOpen} />
    </div>
   )
 }