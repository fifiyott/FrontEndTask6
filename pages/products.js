import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../redux/actions/actions";

const Products = (props) => {
  const dispatch = useDispatch();
  const { handleEdit } = props;
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // const handleDelete = (id) => {
  //   dispatch(deleteProduct(id));
  //   alert("Data Product" + " " + "Berhasil Dihapus");
  // };

  // const handleDelete =()=>{
  //   dispatch(deleteProduct({id:product.id}),
  //   alert(list.title + " " + "Berhasil Dihapus"));
  // }

  return (
    <section className="product">
      <div className="list-group">
        <div className="list-header">
            <h1 className="headerlist">List</h1>
            {/* <div className="filter-post">
                <input type="text"
                    className="filter"
                    placeholder="Search"
                    onChange={ (e) => {
                    setSearchFilter(e.target.value);
                    } }
                />
            </div> */}
        </div>
      </div>
      {loading
        ? "Loading..."
        : error
        ? error.message
        : products.map((product) => (
            <div className="flex-container">
            <div className="flex-left">
                <h3 key={product.id}>{product.title}</h3>
                <p>Rp. {product.price}</p>
                <p>{product.category}</p>
            </div>
            <div className="flex-right">
                <button className="btnEdit" onClick={() => handleEdit(product)}>Edit</button>
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