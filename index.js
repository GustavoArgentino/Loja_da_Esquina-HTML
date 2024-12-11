document.addEventListener('DOMContentLoaded', function() {
    
    // Função de adicionar o produto ao carrinho
    function Adicionar() {
        const adicionarAoCarrinho = document.getElementsByClassName("add-to-cart");
        for (let i = 0; i < adicionarAoCarrinho.length; i++) {
            adicionarAoCarrinho[i].addEventListener("click", addProductToCart);
        }
    }

function addProductToCart(event) {
    const button = event.target;
    
    
    const productElement = button.closest('.oferta');
    
    // Pegando as informações do produto dentro do contêiner
    const productImage = productElement.querySelector('.product-image').src;
    const productTitle = productElement.querySelector('.product-title').innerText;
    const productPrice = productElement.querySelector('.product-price').innerText;

    // Criando um produto
    const product = {
        image: productImage,
        title: productTitle,
        price: productPrice
    };

    // Obtendo os produtos do carrinho que estão no localstorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const produtoJaExiste = cart.findIndex(item => item.title === product.title && item.price === product.price);

    if (produtoJaExiste !== -1) {
        // Se o produto já existe aumenta a quantidade
        cart[produtoJaExiste].quantity += 1;
    } else {
        // Se o produto não existe adiciona com quantidade 1
        product.quantity = 1;
        cart.push(product); 
    }


    
    // Salva o carrinho de volta no localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produto adicionado ao carrinho");
}
    Adicionar();
 });

 // Esse codigo utiliza o "localStorage", que é um lugar do navegador acessível, e que salva as informações. Não utlizamos o "sessionStorage", porque com o regarregamento da pagina, os produtos adicionados seriam perdidos.

 // Para salvar o carrinho, tranformamos o array do produto em uma string, utilizando o "json.stringify()".

 // O "getItem("cart")" recupera o carrinho armazenado na storage, e caso esteja vazio utilizamos o "|| []" para iniciar com um array vazio.

 // Usaamos o "closest()"" para pegar o contêiner da oferta, sem necessariamente depender da extrutura exata do DOM porque ele pega o elemento mais proximo que tem a classe .oferta.

 // O "querySelector()", pega as informações de dentro do container encontrado, e coloquei para armazenar em variaveis.

