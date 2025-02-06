export const API_BASE = "http://localhost:8080";

export async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en la solicitud");
    }
    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
