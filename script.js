const nc = document.getElementById("nomec")
const cpfc = document.getElementById("cpfc")
const clsloja = JSON.parse(localStorage.getItem("clsloja")) || []

const cpfrc = document.getElementById("cpfrc")

const np = document.getElementById("nomep")
const qp = document.getElementById("qtdp")
const vp = document.getElementById("vlrp")
const pdtloja = JSON.parse(localStorage.getItem("pdtloja")) || []

const ep = document.getElementById("nomeep")
const qntep = document.getElementById("qntep")

const vndc = document.getElementById("vendac")
const vndp = document.getElementById("vendap")
const vndq = document.getElementById("vendaq")
const pdtvendas = JSON.parse(localStorage.getItem("pdtvendas")) || []

const dados = document.getElementById("lc") || []
const dadosp = document.getElementById("lp") || []
const dadosv = document.getElementById("vp") || []

function cadep() {
    if(ep.value.trim() && qntep.value.trim()){
        let achou = false
        for(let pdt of pdtloja){
            if(pdt.Produto == ep.value){
                achou = true

                if(Number(qntep.value) > 0){
                    pdt.Quantidade = Number(pdt.Quantidade) + Number(qntep.value)

                    localStorage.setItem("pdtloja", JSON.stringify(pdtloja))
                    alert(pdt.Produto + " Quantidade adicionada no estoque com sucesso!")
                    list()
                }else{
                    alert("Quantidade inválida!")
                }
            }
        }if(!achou){
            alert("Produto não cadastrado!")
        }
    }else{
        alert("Preencha todos os campos!")
    }
}


function cadcl() {
    if(nc.value.trim() && cpfc.value.trim()){
        if(/^[A-Za-zÀ-ý\s]+$/.test(nc.value)){
            if(/^\d{11}$/.test(cpfc.value)){
                let achou = false
                for(let c of clsloja){
                    if(c.CPF == cpfc.value)
                        achou = true;
                }if(!achou){
                    console.log("Cliente Não Cadastrado")
                    const cls = {
                    Nome: nc.value,
                    CPF: cpfc.value
                }
                clsloja.push(cls)
                localStorage.setItem("clsloja", JSON.stringify(clsloja))
                alert(cls.Nome + " Cadastro Efetuado com sucesso")
                listar()
                }else{
                    alert(" Esse CPF já esta Cadastrado na Loja !!! ")
                }
            }else{
            alert("CPF deve conter 11 digitos")
        }
        }else{
            alert("Nome invalido, use apenas letras e espaços")
        }
    }else{
        alert("Preencha todos os campos!!!")
    }
}

function cadpd() {
    if(np.value.trim() && qp.value.trim() && vp.value.trim()){
        if(Number(vp.value) > 0) {
            if(Number(qp.value) > 0) {
                let achou = false
                for(let p of pdtloja){
                    if(p.Produto == np.value)
                        achou = true;
                }if(!achou){
                    console.log("Produto não Cadastrado")
                    const pdt = {
                        Produto: np.value,
                        Quantidade: Number(qp.value),
                        Preço: Number(vp.value)
                    }
                    pdtloja.push(pdt)
                    localStorage.setItem("pdtloja", JSON.stringify(pdtloja))
                    alert(pdt.Produto + " Cadastrado com sucesso ")
                    list()
                }else{
                    alert("Já Existe esse Produto Cadastrado")
                }
            }else{
                alert("A quantidade deve ser maior que zero")
            }
        }else{
            alert("O preço deve ser maior que zero")
        }
    }else{
        alert(" Preencha todos os Campos!!! ")
    }
}

function vendapdt(){
    if(vndc.value.trim() && vndp.value.trim() && vndq.value.trim()){
        let achouc = false
        let achoup = false

        for(let p of clsloja){
            if(p.CPF == vndc.value){
                achouc = true
            }
        }if(achouc){
            for(let p of pdtloja){
                if(p.Produto == vndp.value){
                    achoup = true
                    if(Number(vndq.value) > 0){
                        if(Number(p.Quantidade) >= Number(vndq.value)){
                            p.Quantidade = Number(p.Quantidade) - Number(vndq.value)

                            let venda = {
                                cliente: vndc.value,
                                produto: vndp.value,
                                quantidade: Number(vndq.value)
                            }
                            pdtvendas.push(venda)

                            localStorage.setItem("pdtvendas", JSON.stringify(pdtvendas))
                            localStorage.setItem("pdtloja", JSON.stringify(pdtloja))
                            alert("Venda efetuada com sucesso")
                            list()
                            listarvenda()

                        }else{
                            alert("Quantidade insuficiente no estoque")
                        }
                    }else{
                        alert("Digite uma quantidade válida")
                    }
                }
            }if(!achoup){
                alert("Esse produto não foi encontrado")
            }
        }else{
            alert("Cliente não cadastrado")
        }
    }else{
        alert("Preencha todos os campos")
    }
}

function editcliente(){
    if(cpfrc.value.trim() && nc.value.trim()){
        let achou = false

        for(let i = 0; i < clsloja.length; i++){
            if(clsloja[i].CPF == cpfrc.value){
                achou = true

                if(/^[A-Za-zÀ-ý\s]+$/.test(nc.value)){
                    clsloja[i].Nome = nc.value

                    localStorage.setItem("clsloja", JSON.stringify(clsloja))

                    alert("Nome do cliente editado com sucesso!")
                    listar()
                }else{
                    alert("Nome inválido, use apenas letras e espaços!")
                }
            }
        }if(!achou){
            alert("Cliente não encontrado!")
        }
    }else{
        alert("Preencha todos os campos!")
    }
}

function listar(){
    dados.innerHTML=' Lista de Clientes'
    for(let cls of clsloja){
        dados.innerHTML+=`<p>Nome: ${cls.Nome}<br> CPF: ${cls.CPF}</p>`
    }
}
function list(){
    dadosp.innerHTML= ' Lista de Produtos'
    for (let pdt of pdtloja){
        dadosp.innerHTML += `<p>Produto: ${pdt.Produto}<br> Quantidade: ${pdt.Quantidade}<br>Preço: ${pdt.Preço}`
    }
}
function listarvenda(){
    if(dadosv){
        dadosv.innerHTML = ' Vendas realizadas '

        for(let venda of pdtvendas){
            dadosv.innerHTML += `<p>Cliente: ${venda.cliente} || Produto: ${venda.produto} || Quantidade: ${venda.quantidade}</p>`
        }
    }
}

function remcliente(){
    if(cpfrc.value.trim()){
        let achou = false
        for(let i = 0; i < clsloja.length; i++){
            if(clsloja[i].CPF == cpfrc.value){
                achou = true
                clsloja.splice(i, 1)
                localStorage.setItem("clsloja", JSON.stringify(clsloja))
                alert("Cliente excluído com sucesso")
                break
            }
        }
        if(!achou){
            alert("Cliente não encontrado")
        }
    }else{
        alert("Digite o CPF do cliente")
    }
}

listar()
list()
listarvenda()