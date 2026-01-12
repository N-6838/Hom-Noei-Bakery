// ===============================
// CART CORE
// ===============================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  localStorage.setItem("cartCount", count);
}

// ===============================
// ADD TO CART
// ===============================
function addToCart(name, price, image) {
  let cart = getCart();

  const index = cart.findIndex(item => item.name === name);

  if (index >= 0) {
    cart[index].qty += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartCount();
}

// ===============================
// UPDATE CART ICON
// ===============================
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

// ===============================
// CLEAR CART
// ===============================
function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartCount");
  location.reload();
}

// ===============================
// INIT
// ===============================
updateCartCount();
