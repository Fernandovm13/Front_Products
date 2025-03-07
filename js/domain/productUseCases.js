import { API_BASE, request } from "../data/apiClient.js";

export async function createProduct(product) {
  return request(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
}

export async function listProducts() {
  return request(`${API_BASE}/products`);
}

export async function updateProduct(product) {
  return request(`${API_BASE}/products`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
}

export async function deleteProduct(productId) {
  return request(`${API_BASE}/products/${productId}`, {
    method: "DELETE"
  });
}

export async function buyProduct(productId) {
  return request(`${API_BASE}/products/${productId}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}