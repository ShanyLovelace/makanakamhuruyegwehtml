document.addEventListener("DOMContentLoaded", function () {

    // SEARCH + REDIRECT (HOME PAGE)
    const searchBox = document.getElementById("searchBox");
    const redirectNotification = document.getElementById("redirectNotification");

    if (searchBox) {
        searchBox.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                event.preventDefault();

                const term = searchBox.value.toLowerCase().trim();

                if (term === "") return;

                localStorage.setItem("searchTerm", term);

                if (redirectNotification) {
                    redirectNotification.textContent = "Redirecting to catalogue...";
                    redirectNotification.classList.add("redirect-show");
                }

                setTimeout(() => {
                    window.location.href = "catalogue.html";
                }, 1200);
            }
        });
    }

    // CATALOGUE FILTER (CATALOGUE PAGE)
    const items = document.querySelectorAll(".toy");
    let savedSearch = localStorage.getItem("searchTerm");

    if (items.length > 0 && savedSearch) {

        savedSearch = savedSearch.toLowerCase().trim();

        let found = false;

        items.forEach(item => {

            const name = (item.getAttribute("data-name") || "").toLowerCase();
            const category = (item.getAttribute("data-category") || "").toLowerCase();
            const text = item.textContent.toLowerCase();

            if (
                name.includes(savedSearch) ||
                category.includes(savedSearch) ||
                text.includes(savedSearch)
            ) {
                item.style.display = "block";
                item.classList.add("search-highlight");

setTimeout(() => {
    item.classList.remove("search-highlight");
}, 5000);
                found = true;
            } else {
                item.style.display = "none";
               
            }
        });

        const searchNotification = document.getElementById("searchNotification");

        if (!found && searchNotification) {
            searchNotification.textContent = "No matching toy found 😢";
            searchNotification.classList.add("show");

            setTimeout(() => {
                searchNotification.classList.remove("show");
            }, 3000);
        }

        localStorage.removeItem("searchTerm");
    }

    // REVIEW FILTER (REVIEW PAGE)
    const reviews = document.querySelectorAll(".review-item");

    if (reviews.length > 0 && savedSearch) {

        reviews.forEach(review => {

            const text = review.textContent.toLowerCase();

            review.style.display = text.includes(savedSearch) ? "" : "none";
        });
    }
 
});
