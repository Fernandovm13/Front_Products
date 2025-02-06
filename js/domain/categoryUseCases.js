import { API_BASE, request } from "../data/apiClient.js";

export async function createCategory(category) {
  return request(`${API_BASE}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category)
  });
}

export async function listCategories() {
  return request(`${API_BASE}/categories`);
}

export async function updateCategory(category) {
  return request(`${API_BASE}/categories`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category)
  });
}

export async function deleteCategory(categoryId) {
  return request(`${API_BASE}/categories/${categoryId}`, {
    method: "DELETE"
  });
}
