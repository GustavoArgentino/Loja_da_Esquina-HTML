// Isso garante que o codigo dentro dessa função só sera executado quando o DOM estiver totalmente carregado.
document.addEventListener('DOMContentLoaded', function() {
    // Parte responsavel por ver os produtos salvos no localstorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {
        document.querySelector('.seção-carrinho .area-carrinho p').innerHTML = "Nenhum produto adicionado";
    } else {

        // Card criado dentro do carrinho para a exibição dos produtos
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
            `;// O data-index vai ser utilizado em seguida para a remoção dos itens do carrinho
            
            cartArea.appendChild(productDiv);
        });

        // Parte que calcula o total, essa parte que estava errada, porque eu n coloquei o preço para multiplicar com a quantidade
        // O reduce percorre todos os preços no carrinho e acumula o valor total
        const total = cart.reduce((acc, product) => {
            const price = parseFloat(product.price.replace('R$', '').trim());
            return acc + price * product.quantity;
        }, 0);

        document.querySelector('.seção-carrinho .total strong:last-child').innerText = `R$ ${total.toFixed(2)}`;
    }

    // Botão de remoção dos produtos
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');  // Pega o índice do produto a ser removido
            cart.splice(index, 1);  // Remove o produto do carrinho
            localStorage.setItem("cart", JSON.stringify(cart));  // Atualiza no localStorage
            button.closest('.produto-no-carrinho').remove();  // Remove o produto do DOM
            updateTotal();  // Atualiza o total do carrinho
        });
    });

    // Função que calcula o total do carrinho após a remoção de algum produto
    function updateTotal() {
        const total = cart.reduce((acc, product) => {
            const price = parseFloat(product.price.replace('R$', '').trim());
            
            return acc + (product.quantity * price);

        }, 0);
        document.querySelector('.seção-carrinho .total strong:last-child').innerText = `R$ ${total}`;
        // acc é a abreviação de "acumulação"
        // Parseflote converte para um numero
        // Mesma lógica que calcula o total
    }
});
