import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crudApi, DOMAIN, PRODUCTS_ENDPOINT } from "../helpers/api";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");

  // Product fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    crudApi
      .get(DOMAIN, PRODUCTS_ENDPOINT)
      .then((res) => {
        setProducts(res?.data || res);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
  }, []);

  const handleOpen = () => {
    // Reset fields
    setTitle("");
    setPrice("");
    setBrand("");
    setStock("");
    setImage(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTitle("");
    setPrice("");
    setBrand("");
    setStock("");
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price) return;

    try {
      const newProduct = await crudApi.create(DOMAIN, PRODUCTS_ENDPOINT, {
        title,
        price,
        brand,
        stock,
        image,
      });
      setProducts((prev) => [...prev, newProduct?.data || newProduct]);
      handleClose();
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to add product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>
        Products List &nbsp;
        <button className="btn btn-success" onClick={handleOpen}>
          Add Product
        </button>
      </h2>
      <input
        type="text"
        placeholder="Filter by product name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.length > 0 ? (
        <table
          className="table table-bordered"
          style={{ width: "50%", marginTop: "1rem" }}
        >
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
              <tr key={product._id || index}>
                <td>{index + 1}</td>
                <td>{product.title || "N/A"}</td>
                <td>{product.price || "N/A"}</td>
                <td>{product.brand || "N/A"}</td>
                <td>{product.stock || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    View Details
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
              <input
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
              <input
                type="text"
                placeholder="Product Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
              <input
                type="number"
                placeholder="Product Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*,application/pdf"
              />
              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClose}
                style={{ marginLeft: "1rem" }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
