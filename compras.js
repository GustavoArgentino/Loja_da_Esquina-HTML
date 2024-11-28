document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        document.querySelector('.seção-carrinho .area-carrinho p').innerHTML = "Nenhum produto adicionado";
    } else {
        const cartArea = document.querySelector('.seção-carrinho .area-carrinho');
        cartArea.innerHTML = '<h3>Seu Carrinho</h3>';
        
        cart.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('produto-no-carrinho');

            productDiv.innerHTML = `
                <img src="${product.image}" class="product-image" alt="${product.title}">
                <h3 class="product-title">${product.title}</h3>
                <span class="product-price">${product.price}</span>
                <span class="product-quantity">Quantidade: ${product.quantity}</span>
                <button class="remove-from-cart" data-index="${index}">Remover</button>
            `;
            
            cartArea.appendChild(productDiv);
        });

        const total = cart.reduce((acc, product) => {
            const price = parseFloat(product.price.replace('R$', '').trim());
            return acc + price;
        }, 0);

        document.querySelector('.seção-carrinho .total strong:last-child').innerText = `R$ ${total.toFixed(2)}`;
    }

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');  // Pega o índice do produto a ser removido
            cart.splice(index, 1);  // Remove o produto do carrinho
            localStorage.setItem("cart", JSON.stringify(cart));  // Atualiza no localStorage
            button.closest('.produto-no-carrinho').remove();  // Remove o produto do DOM
            updateTotal();  // Atualiza o total do carrinho
        });
    });

    // Função que calcula o total do carrinho
    function updateTotal() {
        const total = cart.reduce((acc, product) => {
            const price = parseFloat(product.price.replace('R$', '').trim());
            return acc + price;
        }, 0);
        document.querySelector('.seção-carrinho .total strong:last-child').innerText = `R$ ${total.toFixed(2)}`;
    }
});
