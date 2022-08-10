let arrayBtnClicadoCarrinho = []

const renderizarUl = (arrayProdutos) => {

    let ul = document.querySelector("ul");

    arrayProdutos.forEach((element, i) => {

        let li = document.createElement("li");

        let img = document.createElement("img");
        img.src = element.img;

        let h3 = document.createElement("h3");
        h3.innerText = element.nome;

        let spanSecao = document.createElement("span");
        spanSecao.innerText = element.secao;

        let divValorPromocao = document.createElement("div")
        divValorPromocao.classList.add("valorPromocao")

        let pValorPromocao = document.createElement("p")
        pValorPromocao.classList.add("valorPromocao__p")
        pValorPromocao.innerText = `R$ ${element.precoPromocao}`

        if (!element.promocao == true) {
            pValorPromocao.innerText = `R$ 0`
        }

        let pNutrientes = document.createElement("p");
        pNutrientes.innerText = element.componentes;

        let pPreco = document.createElement("p");
        let promocaoConvertida = parseFloat(element.precoPromocao)

        if (element.promocao == true) {
            let promocao = element.preco - promocaoConvertida
            pPreco.innerText = `R$ ${promocao}`;
        } else {
            pPreco.innerText = `R$ ${element.preco}`;
        }

        let button = document.createElement("button");
        button.innerText = "COMPRAR";
        button.classList.add("btnCompra");
        button.id = element.id;

        button.addEventListener("click", function (event) {
            produtos.forEach((element) => {
                console.log(element)
                if (event.target.id == element.id) {
                    arrayBtnClicadoCarrinho.push(element);
                    ulcarrinhoCompras(arrayBtnClicadoCarrinho);
                    filtroParaOSomatorioCarrinho(arrayBtnClicadoCarrinho);

                }
            })
        })
        divValorPromocao.appendChild(pValorPromocao)
        li.append(img, h3, spanSecao, divValorPromocao, pNutrientes, pPreco, button);
        ul.appendChild(li);
    });
    return ul;
}
renderizarUl(produtos);

let botoesContainer = document.getElementById("botoesContainer")

botoesContainer.addEventListener("click", (event) => {
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
    filtragemUlPrincipal(result)
})

const ulcarrinhoCompras = (redezinadoUlCarrinho) => {

    let ulCarrinho = document.querySelector(".carrinhoDeCompra__ul");

    ulCarrinho.innerHTML = "";

    redezinadoUlCarrinho.forEach((element, i) => {

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

        let promocao = parseFloat(element.preco - element.precoPromocao)

        if (element.promocao == true) {
            pProdutopreco.innerText = `R$ ${promocao}`.replace(".", ",");

        } else {
            pProdutopreco.innerText = `R$ ${element.preco}`.replace(".", ",");
        }

        let button = document.createElement("button");
        button.classList.add("removerProdutos");
        button.innerText = "remover do carrinho";
        button.id = element.id;

        button.addEventListener("click", (event) => {
            if (event.target.id == element.id) {
                arrayBtnClicadoCarrinho.splice(0, 1)
                ulcarrinhoCompras(arrayBtnClicadoCarrinho);
                filtroParaOSomatorioCarrinho(arrayBtnClicadoCarrinho);
            }
        })
        li.append(img, pNomeProduto, pProdutopreco, button);
        ulCarrinho.appendChild(li);
    })
    quantidade(arrayBtnClicadoCarrinho.length);
    return ulCarrinho
}

const barraDePesquisaInput = () => {
    let input = document.querySelector(".campoBuscaPorNome")

    input.addEventListener("keyup", (event) => {

        let input = event.target;

        let inputValue = input.value.toLowerCase().trim();

        let ul = document.querySelector("ul");
        ul.innerHTML = "";
        let arrayPesquisa = [];

        if (inputValue == "") {
            return renderizarUl(produtos) && filtragemUlPrincipal(produtos);
        }
        produtos.forEach((element) => {
            if (element.nome.toLowerCase().includes(inputValue)
                || element.categoria.toLowerCase().includes(inputValue)
                || element.secao.toLowerCase().includes(inputValue)) {
                arrayPesquisa.push(element);
            }
        })
        renderizarUl(arrayPesquisa);
        filtragemUlPrincipal(arrayPesquisa)
    })
}
barraDePesquisaInput();

const barraDePesquisaBtn = () => {

    let btnPesquisaProduto = document.querySelector("#btnPesquisar");

    let input = document.querySelector(".campoBuscaPorNome")

    btnPesquisaProduto.addEventListener("click", () => {

        let ul = document.querySelector("ul");
        ul.innerHTML = "";

        let inputValue = input.value.toLowerCase().trim();

        let arrayBtnPesquisa = [];

        if (inputValue == "") {
            return renderizarUl(produtos) && filtragemUlPrincipal(produtos);
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
        filtragemUlPrincipal(arrayBtnPesquisa)
    })
}
barraDePesquisaBtn();

const filtragemUlPrincipal = (somaFiltro) => {

    let spanValor = document.querySelector("#totalDacompra");

    let somatorioDoFiltro = 0;

    somaFiltro.forEach((element) => {
        if (element.promocao == true) {
            let promocao = parseFloat(element.preco - element.precoPromocao)
            somatorioDoFiltro += promocao
        } else {
            somatorioDoFiltro += parseFloat(element.preco)
        }
    })
    return spanValor.innerText = `R$ ${somatorioDoFiltro}`;
}
filtragemUlPrincipal(produtos);

const quantidade = (lengthUlCarrinhoCompras) => {

    let quantidadeCarrinho = document.querySelector(".carrinhoDeCompra__quantidade")

    return quantidadeCarrinho.innerText = `QUANTIDADE: ${lengthUlCarrinhoCompras} `
}

const filtroParaOSomatorioCarrinho = (somaFiltro) => {

    let spanValor = document.querySelector(".carrinhoDeCompra__valorCompra");

    let somatorioDoFiltro = 0;

    somaFiltro.forEach((element) => {
        if (element.promocao == true) {
            let promocao = parseFloat(element.preco - element.precoPromocao)
            somatorioDoFiltro += promocao
        } else {
            somatorioDoFiltro += parseFloat(element.preco)
        }
    })

    return spanValor.innerText = `VALOR DA COMPRA: R$ ${somatorioDoFiltro} `;
}
filtroParaOSomatorioCarrinho()
