import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../api/api";

export default function ProductForm({ show=true, onClose, product }){
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [desc, setDesc] = useState("");

  useEffect(()=> {
    if(product){ setName(product.name); setQuantity(product.quantity); setDesc(product.description || ""); }
    else { setName(""); setQuantity(0); setDesc(""); }
  }, [product]);

  const save = async () => {
    if (quantity === 0) {
      const confirmZero = window.confirm(
        "Quantity is set to 0. This product will no longer appear in the list. Are you sure?"
      );
      if (!confirmZero) return;
    }

    const payload = { name, quantity, description: desc };
    if(product) await api.put(`/products/${product.id}`, payload);
    else await api.post(`/products`, payload);
    onClose?.();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Edit" : "Add"} Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(0, parseInt(e.target.value || 0)))} />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
              value={desc}
              onChange={e => setDesc(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={save}>{product ? "Update" : "Save"}</Button>
      </Modal.Footer>
    </Modal>
  );
}
