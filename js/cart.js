// Cart functionality for Shany's Handmade Toys
function showNotification(message){

    const notification = document.getElementById("notification");

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const clearCart = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");

// Display cart items
function renderCart() {

    // Safety check: if cartItems element doesn't exist on this page, exit early to prevent crashes
    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty </p>";
        if (totalPrice) totalPrice.textContent = "Total: R0";

        return;
    }

    cart.forEach((item, index) => {

        // Safety defaults
        item.price = Number(item.price) || 0;
        item.quantity = Number(item.quantity) || 1;

        let subtotal = item.price * item.quantity;

        total += subtotal;

        let div = document.createElement("div");

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="150">

            <p><strong>${item.name}</strong></p>

            <p>Price: R${item.price}</p>

            <button onclick="decreaseQuantity(${index})">−</button>

            <span style="margin:0 10px;">
                ${item.quantity}
            </span>

            <button onclick="increaseQuantity(${index})">+</button>

            <p>Subtotal: R${subtotal}</p>

            <button onclick="removeItem(${index})">
                Remove
            </button>

            <hr>
        `;

        cartItems.appendChild(div);
    });

    if (totalPrice) {
        totalPrice.textContent = "Total: R" + total;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item from cart
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// Increase Quantity
function increaseQuantity(index) {

    cart[index].quantity = Number(cart[index].quantity) || 1;

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// DECREASE QUANTITY
function decreaseQuantity(index) {

    cart[index].quantity = Number(cart[index].quantity) || 1;

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// Clear Cart button
if (clearCart) {

    clearCart.addEventListener("click", function () {

        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    });
}

// Checkout button
if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            showNotification("Your cart is empty.");

            return;
        }

        showNotification("Thank you for shopping at Shany's Handmade Toys! 🎉");

        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    });
}

// INITIAL LOAD
renderCart();