
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage
let cart = JSON.parse(
  window.sessionStorage.getItem("cart") || "[]"
);

// Render products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>`;

    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");

    li.textContent = `${product.name} - $${product.price}`;

    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (!product) return;

  cart.push(product);

  window.sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(
    (product) => product.id !== Number(productId)
  );

  window.sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];

  window.sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// Handle Add to Cart clicks
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event.target.dataset.id);
  }
});

// Handle Clear Cart click
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
