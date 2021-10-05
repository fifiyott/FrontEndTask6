import Head from 'next/head'
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../redux/actions/actions";
import Styles from '../styles/Home.module.css'
import Products from "./products";
import Headers from "../components/header"



export default function HomeStore() {

  const dispatch = useDispatch()

  const[updateData, setUpdateData] = useState({id:null, status:false});
  
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

  return (
   
    <div className='container'>
      <Head>
        <title>List Product</title>
        <meta name="keywords" content="list"></meta>
      </Head>

      <Headers />
      <form onSubmit={handleSubmit} className="form-universal">
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
          <button type="submit" className="btnSubmit">
            Submit
          </button>
        </div>
      </form>
    <Products handleEdit={handleEdit} />
    </div>
   )
 }