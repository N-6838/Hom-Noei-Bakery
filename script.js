let count = 0;

// อัปเดตตัวเลขบนหน้าเว็บทุกหน้า
function updateCartDisplay() {
  const c = document.getElementById("count");
  if (c) c.textContent = count;   // เฉพาะหน้า index.html
  const total = document.getElementById("total");
  if (total) total.textContent = count + " ชิ้น";  // หน้า cart.html
}
updateCartDisplay();

function updateCartPage() {
  let count = localStorage.getItem("cartCount") || 0;
  document.getElementById("total").innerText = count + " ชิ้น";
}

updateCartPage();

// ดึงตะกร้า
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// บันทึกตะกร้า
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartCount", cart.reduce((s, i) => s + i.qty, 0));


// อัปเดตจำนวนในไอคอนตะกร้า
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  localStorage.setItem("cartCount", count);
}

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartCount");
  location.reload();
}

// เพิ่มสินค้า
function addToCart(name, price, image) {
  let cart = getCart();

  let found = cart.find(item => item.name === name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

   saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText =
    localStorage.getItem("cartCount") || 0;
}

function clearCart() {
  localStorage.clear();
  location.reload();
}

updateCartCount();
