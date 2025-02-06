export function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML =
    products && products.length > 0
      ? `<ul class="list">
        ${products
          .map(
            (p) => `
          <li class="list-item" data-id="${p.id}">
            <div class="item-info">
              <span><strong>ID:</strong> ${p.id}</span>
              <span><strong>Nombre:</strong> ${p.name}</span>
              <span><strong>Precio:</strong> ${p.price}</span>
              <span><strong>Categoría:</strong> ${p.category_id || "N/A"}</span>
            </div>
            <div class="actions">
              <button class="btn edit-btn edit-product" data-id="${p.id}">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn delete-btn delete-product" data-id="${p.id}">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </li>`
          )
          .join("")}
      </ul>`
      : "<p>No hay productos</p>";
}

export function renderCategories(categories) {
  const container = document.getElementById("categories-container");
  container.innerHTML =
    categories && categories.length > 0
      ? `<ul class="list">
        ${categories
          .map(
            (c) => `
          <li class="list-item" data-id="${c.id}">
            <div class="item-info">
              <span><strong>ID:</strong> ${c.id}</span>
              <span><strong>Nombre:</strong> ${c.name}</span>
            </div>
            <div class="actions">
              <button class="btn edit-btn edit-category" data-id="${c.id}">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn delete-btn delete-category" data-id="${c.id}">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </li>`
          )
          .join("")}
      </ul>`
      : "<p>No hay categorías</p>";
}
