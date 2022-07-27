// seu código aqui

function criandoCartoes(ProdutosMostrados) {

    let ul = document.querySelector("ul")

    for (let i = 0; i < ProdutosMostrados.length; i++) {

        let li = document.createElement("li")

        let img = document.createElement("img")
        img.src = ProdutosMostrados[i].img

        let h3 = document.createElement("h3")
        h3.innerText = ProdutosMostrados[i].nome

        let span = document.createElement("span")
        span.innerText = ProdutosMostrados[i].secao

        let p = document.createElement("p")
        p.innerText = `R$ ${ProdutosMostrados[i].preco},00`

        li.append(img, h3, span, p)

        ul.appendChild(li)
    }
    filtroParaOSomatorio(produtos)

    return ul
}
criandoCartoes(produtos)

function todosOsProdutos(produtosTotais) {

    let precoTotalProdutos = 0

    for (let i = 0; i < produtosTotais.length; i++) {
        precoTotalProdutos += produtosTotais[i].preco
    }

    return precoTotalProdutos
}
todosOsProdutos(produtos)

document.getElementById("botoesContainer").addEventListener("click", (event) => {
    let ul = document.querySelector("ul")

    let result = []

    if (event.target.id == "todosProdutos") {
        ul.innerText = " "
        criandoCartoes(produtos)
        for (let i = 0; i < produtos.length; i++) {
            result.push(produtos[i])
        }

    }
    if (event.target.id == "hortifruti") {
        ul.innerHTML = " "
        result = produtos.filter(secaoFruta => secaoFruta.categoria == 'fruta');
        criandoCartoes(result)
    }
    if (event.target.id == "panificadora") {
        ul.innerHTML = " "
        result = produtos.filter(secaoPaes => secaoPaes.categoria == 'Pães');
        criandoCartoes(result)
    }
    if (event.target.id == "laticinios") {
        ul.innerHTML = " "
        result = produtos.filter(secaoLeite => secaoLeite.categoria == 'Leite');
        criandoCartoes(result)
    }
    filtroParaOSomatorio(result)
})

function barraDePesquisa() {

    let btnPesquisar = document.querySelector("#btnPesquisar")

    btnPesquisar.addEventListener("click", function () {

        let arrayPesquisa = []

        let input = document.querySelector(".campoBuscaPorNome")
        let inputValue = input.value
        let inputTratado = inputValue.toLowerCase()

        for (let i = 0; i < produtos.length; i++) {
            let nomeLista = produtos[i].nome
            let nomeListaTratado = nomeLista.toLowerCase()
            if (nomeListaTratado.includes(inputTratado)) {
                arrayPesquisa.push(produtos[i])
            }
        }
        criandoCartoes(arrayPesquisa)
    })
}
barraDePesquisa()

function filtroParaOSomatorio(somaFiltro) {

    let spanPreco = document.querySelector("#totalDacompra")

    let somatorioDoFiltro = 0

    for (let i = 0; i < somaFiltro.length; i++) {

        somatorioDoFiltro += somaFiltro[i].preco
    }

    return spanPreco.innerText = `R$ ${somatorioDoFiltro},00`
}

function valorPesquisa() {

    let btnPesquisa = document.getElementById("btnPesquisar")
    console.log(btnPesquisa)
    let input = document.querySelector(".campoBuscaPorNome")
    console.log(input)

    input.addEventListener("keyup", (event) => {
        let input = event.target
        let inputValue = input.value.toLowerCase()

        let ul = document.querySelector("ul")
        ul.innerHTML = ""
        let arrayPesquisa = []
        for (let i = 0; i < produtos.length; i++) {
            let produtosNome = produtos[i].nome.toLowerCase()
            console.log(produtosNome)
            if (inputValue.includes(produtosNome)) {
                arrayPesquisa.push(produtos[i])
            }
        }
        criandoCartoes(arrayPesquisa)
        filtroParaOSomatorio(arrayPesquisa)
    })
}
valorPesquisa()


