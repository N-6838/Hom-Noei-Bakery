// ===============================
// Hom Noei Bakery - script.js
// Cart + User Menu + Auth Demo
// ===============================

// ---------- Helpers ----------
function $(id) { return document.getElementById(id); }

// ---------- CART ----------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  const count = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  localStorage.setItem("cartCount", count);
}

function updateCartCount() {
  const el = $("cart-count");
  if (!el) return;
  el.innerText = localStorage.getItem("cartCount") || 0;
}

function addToCart(name, price, image) {
  const cart = getCart();

  const n = (name || "").trim();
  const p = Number(price) || 0;
  const img = image || "images/no-image.png";

  if (!n || p <= 0) {
    alert("เพิ่มสินค้าไม่สำเร็จ: ชื่อ/ราคาไม่ถูกต้อง");
    return;
  }

  const found = cart.find(i => i.name === n);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ name: n, price: p, image: img, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartCount");
  updateCartCount();
  location.reload();
}

window.addToCart = addToCart;
window.clearCart = clearCart;
window.getCart = getCart;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;

// ---------- AUTH (Demo localStorage) ----------
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("userName", user.username || "");
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logoutDemo() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  alert("ออกจากระบบแล้ว");
  location.href = "login.html";
}
window.logoutDemo = logoutDemo;

// ---------- USER MENU (top-right dropdown) ----------
function initUserDropdown() {
  const userBtn = $("userBtn");
  const userDropdown = $("userDropdown");
  if (!userBtn || !userDropdown) return;

  userBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    userDropdown.classList.remove("open");
  });
}

function syncUserMenu() {
  const nameEl = $("menuUserName");
  const loginItem = $("loginItem");
  const logoutItem = $("logoutItem");

  if (!nameEl && !loginItem && !logoutItem) return;

  const u = getCurrentUser();
  if (u && u.username) {
    if (nameEl) nameEl.innerText = u.username;
    if (loginItem) loginItem.style.display = "none";
    if (logoutItem) logoutItem.style.display = "block";
  } else {
    if (nameEl) nameEl.innerText = "ยังไม่เข้าสู่ระบบ";
    if (loginItem) loginItem.style.display = "block";
    if (logoutItem) logoutItem.style.display = "none";
  }

  if (logoutItem) {
    logoutItem.onclick = logoutDemo;
  }
}

// ---------- LOGIN FORM ----------
function initLoginForm() {
  const form = $("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInput = $("login-user").value.trim().toLowerCase();
    const password = $("login-password").value;

    const users = getUsers();
    const found = users.find(u =>
      u.username.toLowerCase() === userInput || u.email.toLowerCase() === userInput
    );

    if (!found || found.password !== password) {
      alert("ชื่อผู้ใช้/อีเมล หรือ รหัสผ่านไม่ถูกต้อง ❌");
      return;
    }

    setCurrentUser({ username: found.username, email: found.email });
    localStorage.setItem("role", "customer");

    alert("เข้าสู่ระบบสำเร็จ 🎉");
    location.href = "index.html";
  });

  // ปุ่มเข้าสู่ระบบพนักงาน (เด้งไปหน้า staff-login.html ถ้ามี)
  const staffBtn = $("staffBtn");
  if (staffBtn) {
    staffBtn.addEventListener("click", () => {
      location.href = "staff-login.html"; // ยังไม่ทำก็ปล่อยไว้ก่อน
    });
  }
}

// ---------- REGISTER FORM ----------
function initRegisterForm() {
  const form = $("register-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = $("reg-username").value.trim();
    const email = $("reg-email").value.trim().toLowerCase();
    const password = $("reg-password").value;

    if (password.length < 4) {
      alert("รหัสผ่านต้องอย่างน้อย 4 ตัวอักษร");
      return;
    }

    const users = getUsers();
    const dup = users.find(u => u.username === username || u.email === email);
    if (dup) {
      alert("ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้แล้ว");
      return;
    }

    users.push({ username, email, password });
    saveUsers(users);

    alert("สมัครสมาชิกสำเร็จ ✅ ไปหน้าเข้าสู่ระบบได้เลย");
    location.href = "login.html";
  });
}

// ---------- BOOT ----------
updateCartCount();
initUserDropdown();
syncUserMenu();
initLoginForm();
initRegisterForm();
