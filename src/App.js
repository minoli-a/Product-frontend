import './App.css';

import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { getProducts, updateQuantity } from "./api/productApi";

function App() {

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setShowForm(false);
    loadProducts();
  }

  const handleQuantityChange = async (id, adjustQuantity) => {
    await updateQuantity(id, adjustQuantity);
    loadProducts();
  };

  return (
    <div className="container">
      <h1>Product Maintenance</h1>
      <ProductForm
        show={showForm}
        onClose={handleCloseForm}
        product={editingProduct}
      />

      <hr />

      <ProductList
        products={products}
        onEdit={handleEdit}
        onQuantityChange={handleQuantityChange}
      />
    </div>
  );
}
export default App;
