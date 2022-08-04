// seu código aqui

let arrayBtnClicadoCarrinho = []

function renderizarUl(arrayProdutos) {

    let ul = document.querySelector("ul");

    arrayProdutos.forEach(element => {

        let li = document.createElement("li");

        let img = document.createElement("img");
        img.src = element.img;

        let h3 = document.createElement("h3");
        h3.innerText = element.nome;

        let spanSecao = document.createElement("span");
        spanSecao.innerText = element.secao;

        let pNutrientes = document.createElement("p");
        pNutrientes.innerText = element.componentes;

        let pPreco = document.createElement("p");
        pPreco.innerText = `R$ ${element.preco}`;

        let button = document.createElement("button");
        button.innerText = "COMPRAR";
        button.classList.add("btnCompra");
        button.id = element.id;

        button.addEventListener("click", function (event) {
            produtos.forEach((element) => {
                if (event.target.id == element.id) {
                    arrayBtnClicadoCarrinho.push(element);
                    ulcarrinhoCompras(arrayBtnClicadoCarrinho);
                    filtroParaOSomatorioCarrinho(arrayBtnClicadoCarrinho);
                }
            })
        })
        li.append(img, h3, spanSecao, pNutrientes, pPreco, button);
        ul.appendChild(li);
    });
   
    return ul;
}
renderizarUl(produtos);

document.getElementById("botoesContainer").addEventListener("click", (event) => {
    let ul = document.querySelector("ul");

    let result = [];

    if (event.target.id == "todosProdutos") {
        ul.innerText = " ";
        renderizarUl(produtos);
        for (let i = 0; i < produtos.length; i++) {
            result.push(produtos[i]);
        }
    }
    if (event.target.id == "hortifruti") {
        ul.innerHTML = " ";
        result = produtos.filter(secaoFruta => secaoFruta.categoria == 'fruta');
        renderizarUl(result);
    }
    if (event.target.id == "panificadora") {
        ul.innerHTML = " ";
        result = produtos.filter(secaoPaes => secaoPaes.categoria == 'Pães');
        renderizarUl(result);
    }
    if (event.target.id == "laticinios") {
        ul.innerHTML = " ";
        result = produtos.filter(secaoLeite => secaoLeite.categoria == 'Leite');
        renderizarUl(result);
    }
})

function ulcarrinhoCompras(redezinadoUlCarrinho) {

    let ulCarrinho = document.querySelector(".carrinhoDeCompra__ul");

    ulCarrinho.innerHTML = " ";

    redezinadoUlCarrinho.forEach((element) => {

        let li = document.createElement("li");
        li.classList.add("carrinhoDeCompra__li");

        let img = document.createElement("img");
        img.classList.add(".carrinhoDeCompra__img");
        img.src = element.img;

        let pNomeProduto = document.createElement("p");
        pNomeProduto.classList.add("carrinhoDeCompra__nomeProduto");
        pNomeProduto.innerText = element.nome;

        let pProdutopreco = document.createElement("p");
        pProdutopreco.classList.add("carrinhoDeCompra__ValorProduto");
        pProdutopreco.innerText = element.preco.replace(".", ",");

        let button = document.createElement("button");
        button.classList.add("removerProdutos");
        button.innerText = "remover do carrinho";
        button.id = element.id;

        button.addEventListener("click", (event) => {
            arrayBtnClicadoCarrinho.forEach((element, i) => {
                if (event.target.id == element.id) {
                    arrayBtnClicadoCarrinho.splice(i, 1);
                    ulcarrinhoCompras(arrayBtnClicadoCarrinho);
                    filtroParaOSomatorioCarrinho(arrayBtnClicadoCarrinho);
                }
            })
        })
        li.append(img, pNomeProduto, pProdutopreco, button);
        ulCarrinho.appendChild(li);
    })

    return ulCarrinho
}

function filtroParaOSomatorioCarrinho(somaFiltro) {

    let spanValor = document.querySelector(".carrinhoDeCompra__valorCompra");

    let somatorioDoFiltro = 0;

    for (let i = 0; i < somaFiltro.length; i++) {

        let precoProduto = somaFiltro[i].preco;
        let conversao = parseInt(precoProduto);

        somatorioDoFiltro += conversao;
    }
    return spanValor.innerText = `VALOR DA COMPRA: R$ ${somatorioDoFiltro},00`;
}

function valorPesquisa() {
    let input = document.querySelector(".campoBuscaPorNome")

    input.addEventListener("keyup", (event) => {

        let input = event.target;

        let inputValue = input.value.toLowerCase().trim();

        let ul = document.querySelector("ul");
        ul.innerHTML = "";
        let arrayPesquisa = [];

        if (inputValue == "") {
            return renderizarUl(produtos) && filtroParaOSomatorio(produtos);
        }
        produtos.forEach((element) => {
            if (element.nome.toLowerCase().includes(inputValue)
                || element.categoria.toLowerCase().includes(inputValue)
                || element.secao.toLowerCase().includes(inputValue)) {
                arrayPesquisa.push(element);
            }
        })
        renderizarUl(arrayPesquisa);
    })
}
valorPesquisa(); 

let btnPesquisa = document.getElementById("btnPesquisar");
let input = document.querySelector(".campoBuscaPorNome");

btnPesquisa.addEventListener("click", barraDePesquisa);
input.addEventListener("keyup", barraDePesquisa)

function barraDePesquisa() {

    let input = document.querySelector(".campoBuscaPorNome");

    let inputValue = input.value.toLowerCase().trim();

    let ul = document.querySelector("ul");
    ul.innerHTML = "";

    let arrayBtnPesquisa = [];

    if (inputValue == "") {
        return renderizarUl(produtos) && filtroParaOSomatorio(produtos);
    } else {
        produtos.forEach((element) => {
            if (element.nome.toLowerCase().includes(inputValue)
                || element.categoria.toLowerCase().includes(inputValue)
                || element.secao.toLowerCase().includes(inputValue)) {
                arrayBtnPesquisa.push(element);
            }
        })
    }
    renderizarUl(arrayBtnPesquisa);
}


