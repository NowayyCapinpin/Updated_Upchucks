let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

function addToCart(product, price) {
    price = Number(price);
    let existingProduct = cart.find(item => item.product === product);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ product, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; 
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let li = document.createElement("div");
        li.classList.add("cart-item");
        li.innerHTML = `
            <span>${item.product} - ₱${item.price} (${item.quantity}x)</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById("total").textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function addProduct() {
    let name = document.getElementById("sell-name").value.trim();
    let price = document.getElementById("sell-price").value.trim();
    let imageInput = document.getElementById("sell-image");
    let image = imageInput.files[0];

    if (name.length === 0 || name.length > 40) {
        alert("Product name must be between 1 and 40 characters.");
        return;
    }

    if (!price || isNaN(price) || price <= 0 || price > 999999) {
        alert("Please enter a valid price (1 - 999999).");
        return;
    }

    if (!image) {
        alert("Please upload an image for your product.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${e.target.result}" alt="${name}" class="product-image" style="width: 100px; height: auto; display: block; margin-bottom: 10px;">
            <h3>${name}</h3>
            <p>Price: ₱${price}</p>
            <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
            <button class="remove-btn" onclick="removeProduct(this)">Remove</button>
        `;

        document.getElementById("user-products").appendChild(productDiv);
    };

    reader.readAsDataURL(image);

    document.getElementById("sell-name").value = "";
    document.getElementById("sell-price").value = "";
    imageInput.value = "";
}

// Function to remove a product from the listing
function removeProduct(button) {
    button.parentElement.remove();
}

function searchProducts() {
    let query = document.getElementById("search-bar").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(query) ? "block" : "none";
    });
}

function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
    document.getElementById(tabId).classList.remove("hidden");

    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add("active");
}

document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (name === "" || email === "" || address === "") {
        alert("Please fill in all details.");
        return;
    }

    alert(`Order placed successfully!\n\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nTotal: ₱${totalAmount}`);

    // Clear cart after checkout
    cart = [];
    updateCart();

    document.getElementById("checkout-form").reset();
});
