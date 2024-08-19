import React, { useState } from 'react';

const ProductsOverviewManagement = () => {
  const [products, setProducts] = useState([
    { title: 'Product 1', description: 'Description for product 1' },
    { title: 'Product 2', description: 'Description for product 2' },
  ]);

  const [newProduct, setNewProduct] = useState({ title: '', description: '' });

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct }]);
    setNewProduct({ title: '', description: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Products:', products);
    alert('Products Overview updated successfully!');
  };

  return (
    <div className="products-overview-management">
      <h2>Products/Services Overview Management</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} className="form-group">
            <label>Product {index + 1} Title:</label>
            <input
              type="text"
              value={product.title}
              onChange={(e) => handleProductChange(index, 'title', e.target.value)}
              placeholder="Enter product title"
            />
            <label>Description:</label>
            <textarea
              value={product.description}
              onChange={(e) => handleProductChange(index, 'description', e.target.value)}
              placeholder="Enter product description"
            />
          </div>
        ))}
        <div className="form-group">
          <h3>Add New Product/Service</h3>
          <label>Title:</label>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            placeholder="Enter new product title"
          />
          <label>Description:</label>
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Enter new product description"
          />
          <button type="button" onClick={handleAddProduct}>Add Product</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProductsOverviewManagement;
