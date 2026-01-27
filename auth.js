// ===== Helpers =====
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// ===== Register =====
const regForm = document.getElementById("register-form");
if (regForm) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;

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

    const newUser = { username, email, password };
    users.push(newUser);
    saveUsers(users);

    alert("สมัครสมาชิกสำเร็จ ✅ ไปหน้าเข้าสู่ระบบได้เลย");
    window.location.href = "login.html";
  });
}

// ===== Login =====
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInput = document.getElementById("login-user").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    const users = getUsers();
    const found = users.find(u => u.username.toLowerCase() === userInput || u.email === userInput);

    if (!found || found.password !== password) {
      alert("ชื่อผู้ใช้/อีเมล หรือ รหัสผ่านไม่ถูกต้อง ❌");
      return;
    }

    setCurrentUser({ username: found.username, email: found.email });
    alert("เข้าสู่ระบบสำเร็จ 🎉");
    window.location.href = "index.html";
  });
}

// ===== Logout (Demo) =====
function logoutDemo() {
  localStorage.removeItem("currentUser");
  alert("ออกจากระบบแล้ว");
}
window.logoutDemo = logoutDemo;
