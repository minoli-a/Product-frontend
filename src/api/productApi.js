const API_BASE = "http://localhost:8080/api/products";

// Retrieve all products
export async function getProducts(page = 0) {
  const res = await fetch(`${API_BASE}?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Create product
export async function createProduct(product) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

// Update product
export async function updateProduct(product) {
  const res = await fetch(`${API_BASE}/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}


export async function updateQuantity(id, adjustQuantity) {
  const res = await fetch(`${API_BASE}/${id}/quantity`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adjustQuantity }),
  });
  if (!res.ok) throw new Error("Failed to update quantity");
  return res.json();
}
