let count = 0;

// อัปเดตตัวเลขบนหน้าเว็บทุกหน้า
function updateCartDisplay() {
  const c = document.getElementById("count");
  if (c) c.textContent = count;   // เฉพาะหน้า index.html
  const total = document.getElementById("total");
  if (total) total.textContent = count + " ชิ้น";  // หน้า cart.html
}
updateCartDisplay();

// ฟังก์ชันเพิ่มสินค้า
function addToCart() {
    let count = parseInt(localStorage.getItem("cartCount")) || 0;
    count += 1;
    localStorage.setItem("cartCount", count); 

    updateCartCount();  // อัปเดตบนหน้าเดิมด้วย
}

// ฟังก์ชันล้างตะกร้าในหน้า cart.html
function clearCart() {
  count = 0;
  localStorage.setItem("cartCount", 0);
  updateCartDisplay();

}

// ฟังก์ชันอัปเดตตัวเลขตะกร้า
function updateCartCount() {
    let count = localStorage.getItem("cartCount") || 0;
    document.getElementById("cart-count").innerText = count; 
}

// เรียกทุกครั้งที่โหลดหน้า
updateCartCount();

function updateCartPage() {
    let count = localStorage.getItem("cartCount") || 0;
    document.getElementById("total").innerText = count + " ชิ้น";
}

updateCartPage();
