import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../redux/actions/actions";
import Image from "next/image";


const Products = (props) => {
  const dispatch = useDispatch();
  const { handleEdit } = props;
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;
  const [ searchFilter, setSearchFilter ] = useState('');
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [editModalIsOpen, seteditModalIsOpen] = useState(false);


  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
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
                <button className="btnEdit" onClick={() => seteditModalIsOpen(true) & handleEdit(product)}>Edit</button>
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
  );
};

export default Products; 