import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crudApi, DOMAIN, PRODUCTS_ENDPOINT } from '../helpers/api';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    brand: '',
    stock: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    crudApi.get(DOMAIN, `${PRODUCTS_ENDPOINT}/${id}`)
      .then(res => {
        const product = res?.data || res;
        setFormData({
          title: product.title || '',
          price: product.price || '',
          brand: product.brand || '',
          stock: product.stock || ''
        });
      })
      .catch(err => {
        console.error("Error loading product:", err);
        setError("Failed to load product.");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await crudApi.update(DOMAIN, `${PRODUCTS_ENDPOINT}/${id}`, formData);
      console.log("Product updated:", updated);
      navigate(`/products/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update product.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '40%' }}>
      <h3 className="text-center mb-3">Edit Product</h3>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Brand</label>
          <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/products/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
