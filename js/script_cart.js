document.addEventListener('DOMContentLoaded', function () {
    mostrarProductosCarrito();
    mostrarTotalCarrito();
});

function mostrarProductosCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    if (!listaCarrito) {
        return;
    }

    listaCarrito.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productCount = getProductCount(cart);

    productCount.forEach(({ name, price, quantity }) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${name} - R$${(price * quantity).toFixed(2)} (${quantity}x)`;
        listaCarrito.appendChild(listItem);
    });
}

function mostrarTotalCarrito() {
    const totalCarrito = document.getElementById('total-carrito');
    if (!totalCarrito) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity || 0), 0);

    totalCarrito.textContent = `Total: R$${total.toFixed(2)}`;
}

function getProductCount(cart) {
    const productCount = new Map();

    cart.forEach(product => {
        const { name, price, quantity } = product;
        if (productCount.has(name)) {
            const existingProduct = productCount.get(name);
            existingProduct.quantity += quantity;
        } else {
            productCount.set(name, { name, price, quantity });
        }
    });

    return Array.from(productCount.values());
}

function clearCart() {
   
    localStorage.removeItem('cart');
   
    mostrarProductosCarrito();
    mostrarTotalCarrito();
}

function addToCart(productName, price, quantityId) {
    var quantity = document.getElementById(quantityId).value;

  
    quantity = parseInt(quantity);

 
    if (isNaN(quantity) || quantity <= 0) {
        alert('Ingrese una cantidad válida y mayor que cero.');
        return;
    }

    // Obtener el carrito actual del almacenamiento local
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

   
    var existingProductIndex = cart.findIndex(product => product.name === productName && product.price === price);

    if (existingProductIndex !== -1) {
    
        cart[existingProductIndex].quantity = quantity;
    } else {
       
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Produto adicionado ao carrinho!');
    mostrarProductosCarrito();
    mostrarTotalCarrito();


    console.log('Price:', price);
    console.log('Quantity:', quantity);
}