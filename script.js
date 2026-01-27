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

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("ออกจากระบบแล้ว");
  window.location.href = "login.html";
}

function initUserMenu() {
  const btn = document.getElementById("userBtn");
  const dd = document.getElementById("userDropdown");
  const nameEl = document.getElementById("menuUserName");
  const loginItem = document.getElementById("loginItem");
  const logoutItem = document.getElementById("logoutItem");

  if (!btn || !dd || !nameEl || !loginItem || !logoutItem) return;

  // อัปเดตชื่อ/สถานะเมนู
  const user = getCurrentUser();
  if (user && user.username) {
    nameEl.textContent = `👋 ${user.username}`;
    loginItem.style.display = "none";
    logoutItem.style.display = "block";
  } else {
    nameEl.textContent = "ยังไม่เข้าสู่ระบบ";
    loginItem.style.display = "block";
    logoutItem.style.display = "block"; // จะซ่อนก็ได้ แต่เราให้กดแล้วเด้งไป login
  }

  // เปิด/ปิด dropdown
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dd.classList.toggle("open");
  });

  // คลิกนอกเมนู = ปิด
  document.addEventListener("click", () => {
    dd.classList.remove("open");
  });

  // ป้องกันคลิกในกล่องแล้วปิด
  dd.addEventListener("click", (e) => e.stopPropagation());

  // Logout
  logoutItem.addEventListener("click", () => logout());
}

document.addEventListener("DOMContentLoaded", initUserMenu);
