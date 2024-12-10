document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productCard = button.parentElement;
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = productCard.querySelector(".price").textContent;
            const productImage = productCard.querySelector("img").src;

            // Crear el objeto del producto
            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
            };

            // Obtener carrito actual del localStorage
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);

            // Guardar carrito actualizado en el localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} añadido al carrito`);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsElement = document.querySelector(".cart-items");
    const totalPriceElement = document.querySelector(".total-price");

    // Obtener carrito del localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("cart-item");

        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="remove-item" data-index="${index}">Quitar</button>
            </div>
        `;

        cartItemsElement.appendChild(listItem);

        // Actualizar precio total
        totalPrice += parseFloat(product.price.replace("$", ""));
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Funcionalidad para quitar productos
    cartItemsElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload(); // Recargar para reflejar cambios
        }
    });
});
