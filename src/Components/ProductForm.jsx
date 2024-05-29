import React, { useState } from 'react';
import './style.css'

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('image', productImage);

    // Send data to your server here, e.g., using fetch or axios
    console.log({
      productName,
      productPrice,
      productDescription,
      productImage
    });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Product Price</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Product image</label>
        <input
          type="file"
          onChange={handleImageChange}
        />
      </div>
      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;