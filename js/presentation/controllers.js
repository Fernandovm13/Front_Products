import * as productUseCases from "../domain/productUseCases.js";
import * as categoryUseCases from "../domain/categoryUseCases.js";
import { renderProducts, renderCategories } from "./views.js";

export function initProductController() {
  const createProductForm = document.getElementById("create-product-form");
  const listProductsBtn = document.getElementById("list-products-btn");
  const productsContainer = document.getElementById("products-container");

  createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const categoryId = document.getElementById("product-category").value;
    const product = { name, price };
    if (categoryId) product.category_id = parseInt(categoryId);
    try {
      await productUseCases.createProduct(product);
      alert("Producto creado con éxito");
      createProductForm.reset();
      loadProducts(); 
    } catch (error) {
      alert("Error al crear producto: " + error.message);
    }
  });

  listProductsBtn.addEventListener("click", loadProducts);

  productsContainer.addEventListener("click", async (e) => {
    const target = e.target;
    const productId = target.getAttribute("data-id");

    if (target.classList.contains("delete-product")) {
        if (confirm("¿Seguro que desea eliminar este producto?")) {
            try {
                await productUseCases.deleteProduct(productId);
                alert("Producto eliminado");
                loadProducts();
            } catch (error) {
                alert("Error al eliminar producto: " + error.message);
            }
        }
    } else if (target.classList.contains("edit-product")) {
        const listItem = target.closest(".list-item"); 
        if (!listItem) return;

        const itemInfo = listItem.querySelector(".item-info");
        const currentName = itemInfo.querySelector("span:nth-of-type(2)").textContent.replace("Nombre: ", "").trim();
        const currentPrice = itemInfo.querySelector("span:nth-of-type(3)").textContent.replace("Precio: ", "").trim();
        const currentCategory = itemInfo.querySelector("span:nth-of-type(4)").textContent.replace("Categoría: ", "").trim();

        const newName = prompt("Nuevo nombre:", currentName);
        if (!newName) return;

        const newPrice = prompt("Nuevo precio:", currentPrice);
        if (!newPrice) return;

        const newCategory = prompt("Nuevo ID de categoría (opcional):", currentCategory);

        const updatedProduct = {
            id: parseInt(productId),
            name: newName,
            price: parseFloat(newPrice),
        };

        if (newCategory) {
            updatedProduct.category_id = parseInt(newCategory);
        } else {
            updatedProduct.category_id = null;
        }

        try {
            await productUseCases.updateProduct(updatedProduct);
            alert("Producto actualizado");
            loadProducts();
        } catch (error) {
            alert("Error al actualizar producto: " + error.message);
        }
    }
});

  async function loadProducts() {
    try {
      const products = await productUseCases.listProducts();
      renderProducts(products);
    } catch (error) {
      alert("Error al listar productos: " + error.message);
    }
  }
}

export function initCategoryController() {
  const createCategoryForm = document.getElementById("create-category-form");
  const listCategoriesBtn = document.getElementById("list-categories-btn");
  const categoriesContainer = document.getElementById("categories-container");

  createCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("category-name").value;
    try {
      await categoryUseCases.createCategory({ name });
      alert("Categoría creada con éxito");
      createCategoryForm.reset();
      loadCategories();
    } catch (error) {
      alert("Error al crear categoría: " + error.message);
    }
  });

  listCategoriesBtn.addEventListener("click", loadCategories);

  categoriesContainer.addEventListener("click", async (e) => {
    const target = e.target;
    const categoryId = target.getAttribute("data-id");
    if (target.classList.contains("delete-category")) {
      if (confirm("¿Seguro que desea eliminar esta categoría?")) {
        try {
          await categoryUseCases.deleteCategory(categoryId);
          alert("Categoría eliminada");
          loadCategories();
        } catch (error) {
          alert("Error al eliminar categoría: " + error.message);
        }
      }
    } else if (target.classList.contains("edit-category")) {
      const currentItem = target.parentElement;
      const currentName = currentItem.innerText.replace(/.*Nombre:\s*/, "").trim();
      const newName = prompt("Nuevo nombre:", currentName);
      if (!newName) return;
      const updatedCategory = {
        id: parseInt(categoryId),
        name: newName
      };
      try {
        await categoryUseCases.updateCategory(updatedCategory);
        alert("Categoría actualizada");
        loadCategories();
      } catch (error) {
        alert("Error al actualizar categoría: " + error.message);
      }
    }
  });

  async function loadCategories() {
    try {
      const categories = await categoryUseCases.listCategories();
      renderCategories(categories);
    } catch (error) {
      alert("Error al listar categorías: " + error.message);
    }
  }
}
