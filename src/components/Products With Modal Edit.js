import React, { useEffect, useState } from 'react';
import { crudApi, DOMAIN, PRODUCTS_ENDPOINT } from '../helpers/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filter, setFilter] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    crudApi.get(DOMAIN, PRODUCTS_ENDPOINT)
      .then((res) => {
        setProducts(res?.data || res);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
  }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setEditMode(true);
      setCurrentProduct(product);
      setTitle(product.title);
      setPrice(product.price);
      setBrand(product.brand);
      setStock(product.stock);
    } else {
      setEditMode(false);
      setCurrentProduct(null);
      setTitle("");
      setPrice("");
      setBrand("");
      setStock("");
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentProduct(null);
    setTitle("");
    setPrice("");
    setBrand("");
    setStock("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price) return;

    try {
      if (editMode && currentProduct) {
        const productId = currentProduct._id;
        const updated = await crudApi.update(DOMAIN, `${PRODUCTS_ENDPOINT}/${productId}`, {
          title,
          price,
          brand,
          stock
        });

        setProducts((prev) =>
          prev.map((p) =>
            p._id === productId
              ? { ...p, title, price, brand, stock }
              : p
          )
        );
      } else {
        const newProduct = await crudApi.create(DOMAIN, PRODUCTS_ENDPOINT, {
          title,
          price,
          brand,
          stock
        });
        setProducts((prev) => [...prev, newProduct?.data || newProduct]);
      }
      handleClose();
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to save product.");
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h2>Products List &nbsp;
        <button className="btn btn-success" onClick={() => handleOpen()}>Add Product</button>
      </h2>
      <input
        type="text"
        placeholder="Filter by product name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {products.length > 0 ? (
        <table className='table table-bordered' style={{ width: "50%", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id|| index}>
                <td>{index + 1}</td>
                <td>{product.title || 'N/A'}</td>
                <td>{product.price || 'N/A'}</td>
                <td>{product.brand || 'N/A'}</td>
                <td>{product.stock || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpen(product)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this product?")) {
                        const productId = product._id;
                         crudApi.remove(DOMAIN, `${PRODUCTS_ENDPOINT}/${productId}`)
                          .then(() => {
                            setProducts((prev) =>
                              prev.filter(p => (p._id) !== productId)
                            );
                          })
                          .catch((err) => console.error("Delete error:", err));
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}

      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            minWidth: "300px"
          }}>
            <h2>{editMode ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Product Name" value={title} onChange={e => setTitle(e.target.value)} style={{ width: "100%", marginBottom: "1rem" }} />
              <input type="number" placeholder="Product Price" value={price} onChange={e => setPrice(e.target.value)} style={{ width: "100%", marginBottom: "1rem" }} />
              <input type="text" placeholder="Product Brand" value={brand} onChange={e => setBrand(e.target.value)} style={{ width: "100%", marginBottom: "1rem" }} />
              <input type="number" placeholder="Product Stock" value={stock} onChange={e => setStock(e.target.value)} style={{ width: "100%", marginBottom: "1rem" }} />
              <button type="submit" className="btn btn-primary">{editMode ? "Update" : "Submit"}</button>
              <button type="button" className="btn btn-danger" onClick={handleClose} style={{ marginLeft: "1rem" }}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
