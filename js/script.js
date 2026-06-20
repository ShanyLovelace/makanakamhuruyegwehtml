document.addEventListener("DOMContentLoaded", () => {
    
    // 1. BACK TO TOP ARROW (Works on all pages)
   
    const topBtn = document.getElementById("backToTop");

    if (topBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

  
    // 2. SHOPPING CART COUNTER (Works on all pages)
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartNumber = document.getElementById("cartNumber");

    function updateCart() {
        if (cartNumber) {
            cartNumber.textContent = cart.length;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Attach click events for adding items (If buttons exist)
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
            showNotification(`${item.name} added to cart`);
        });
    });

    // Initial load of the cart counter
    updateCart();

    function showNotification(message) {
        const notification = document.getElementById("notification");
        if (notification) {
            notification.textContent = message;
            notification.classList.add("show");
            setTimeout(() => {
                notification.classList.remove("show");
            }, 3000);
        }
    }

   
    // 3. CATALOGUE FILTERS & SORTING (Shop Page Only)

    const catalogue = document.getElementById("catalogue");
    const filterSelect = document.getElementById("filterSelect");
    const sortSelect = document.getElementById("sortSelect");
    const priceSlider = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const toys = Array.from(document.querySelectorAll(".toy"));

    // Guard clause: Only run this code if we are actually on the Shop page
    if (catalogue && filterSelect && priceSlider) {
        
        function applyFilters() {
            let maxPrice = Number(priceSlider.value);
            let category = filterSelect.value;

            if (priceValue) priceValue.textContent = "R" + maxPrice;

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

        filterSelect.addEventListener("change", applyFilters);
        priceSlider.addEventListener("input", applyFilters);

        if (sortSelect) {
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
        }
    }
});