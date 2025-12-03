import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Button, Table } from "react-bootstrap";
import ProductForm from "./ProductForm";

export default function ProductList(){
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetch = async (p=0) => {
    const res = await api.get(`/products?page=${p}`);
    setProducts(res.data.content);
    setPage(p);
  }

  const loadProducts = async (pageNumber = 0) => {
    const response = await api.get(`/products?page=${pageNumber}`);
    setProducts(response.data.content);
    setPage(response.data.number);
    setTotalPages(response.data.totalPages);
};

useEffect(() => {
  loadProducts(0);
}, []);


  const adjust = async (id, adjustQuantity) => {
    try{
      await api.patch(`/products/${id}/quantity`, { adjustQuantity });
      fetch(page);
    }catch(e){ console.error(e); }
  }

  return (
    <div className="container mt-4">
      <h3>Products</h3>
      <Button onClick={()=>{ setEditing(null); setShowForm(true); }}>Add Product</Button>
      <Table bordered className="mt-3">
        <thead><tr><th>Product Name</th><th>Quantity</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>
                <Button size="sm" onClick={()=>adjust(p.id, 1)}>Add</Button>{' '}
                <Button size="sm"
                  onClick={async () => {
                    if (p.quantity === 1) {
                      const confirm = window.confirm(
                        "Quantity will become 0. This product will no longer appear in the list. Are you sure?"
                      );
                      if (!confirm) return;
                    }
                    await adjust(p.id, -1);
                  }}
                  disabled={p.quantity <= 0}>Remove</Button>{' '}
                <Button size="sm"
                  onClick={() => { setEditing(p); setShowForm(true) }}>Update</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        {page > 0 && (
            <Button  onClick={() => loadProducts(page - 1)}>Previous</Button>
        )}

        {page < totalPages - 1 && (
            <Button  onClick={() => loadProducts(page + 1)}>Next</Button>
        )}
      </div>

      {showForm && <ProductForm show onClose={()=>{setShowForm(false); fetch(page);}} product={editing} />}
    </div>
  );
}
