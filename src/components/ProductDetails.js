import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crudApi, DOMAIN, PRODUCTS_ENDPOINT } from '../helpers/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    crudApi.get(DOMAIN, `${PRODUCTS_ENDPOINT}/${id}`)
      .then(res => setProduct(res?.data || res))
      .catch(err => {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details.");
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      const res = await crudApi.remove(DOMAIN, `${PRODUCTS_ENDPOINT}/${id}`);
      console.log("Product deleted:", res);
      navigate('/products');
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product.");
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      {/* Header Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => navigate('/products')} className="btn btn-secondary">
          Back
        </button>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate(`/products/${id}/edit`)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <h4 className="text-center mb-3">Product Details</h4>

      {error && <p className="text-danger">{error}</p>}

      {product ? (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{product._id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{product.title}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{product.price}</td>
            </tr>
            <tr>
              <th>Brand</th>
              <td>{product.brand}</td>
            </tr>
            <tr>
              <th>Stock</th>
              <td>{product.stock}</td>
            </tr>
          </tbody>
        </table>
      ) : !error && (
        <p className="text-center">Loading product...</p>
      )}
    </div>
  );
}

export default ProductDetails;
