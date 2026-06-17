document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

 const cartNumber = document.getElementById("cartNumber");

 // update cart display
 function updateCart() {
    cartNumber.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));

 }

 // attach click events
 document.querySelectorAll(".toy button").forEach(button => {
    button.addEventListener("click", function () {

        let toy = this.parentElement;

        let item = {
            name: toy.dataset.name,
            price: Number(toy.dataset.price),
            category: toy.dataset.category,
           image: toy.querySelector("img").getAttribute("src"),
           quantity: 1
        };

        cart.push(item);

        updateCart();

        showNotification(`${item.name} added to cart `);
    });
 });

 // load cart on page start
 updateCart();

    const catalogue = document.getElementById("catalogue");
    const toys = Array.from(document.querySelectorAll(".toy"));

    const filterSelect = document.getElementById("filterSelect");
    const sortSelect = document.getElementById("sortSelect");
    const priceSlider = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");

    function applyFilters() {
        let maxPrice = Number(priceSlider.value);
        let category = filterSelect.value;

        priceValue.textContent = "R" + maxPrice;

        toys.forEach(toy => {
            let price = Number(toy.dataset.price);
            let cat = toy.dataset.category;

            let matchCategory = (category === "all" || cat === category);
            let matchPrice = price <= maxPrice;

            if (matchCategory && matchPrice) {
                toy.style.display = "block";
            } else {
                toy.style.display = "none";
            }
        });
    }

    // FILTER + SLIDER together
    filterSelect.addEventListener("change", applyFilters);
    priceSlider.addEventListener("input", applyFilters);

    // SORT 
    sortSelect.addEventListener("change", function () {
        let value = this.value;
        let sorted = [...toys];

        if (value === "priceLow") {
            sorted.sort((a, b) => a.dataset.price - b.dataset.price);
        }

        if (value === "priceHigh") {
            sorted.sort((a, b) => b.dataset.price - a.dataset.price);
        }

        if (value === "nameAZ") {
            sorted.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        }

        if (value === "nameZA") {
            sorted.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        }

        sorted.forEach(toy => catalogue.appendChild(toy));
    });
 function showNotification(message){

    const notification = document.getElementById("notification");

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
    }
    let notification = document.getElementById("formNotification");

if (notification) {
    notification.textContent = "Message submitted successfully!";
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
        notification.textContent = "";
    }, 3000);
}
});