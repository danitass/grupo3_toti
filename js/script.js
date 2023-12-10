document.addEventListener("DOMContentLoaded", function() {
    var productCards = document.querySelectorAll(".product-card");

   
    productCards.forEach(function(card) {
        card.classList.add("fade-in");
    });
});


 // carrinho de compras

 function addToCart(productName, price) {

    localStorage.removeItem('cart'); 



    alert('Produto adicionado ao carrinho!');
    mostrarProductosCarrito();
    mostrarTotalCarrito();
}