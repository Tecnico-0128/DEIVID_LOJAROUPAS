
import produtos from '../models/produtos.js'

export async function cadastrar(dados) {
    return await produtos.create({
        produto: dados.produto,
        quantidade: dados.quantidade,
        preco: dados.preco
    })
}

export async function listar() {
    return await produtos.findAll()
}

export async function adicionarEstoque(id, dados) {
    const produto = await produtos.findByPk(id)

    if (!produto) {
        return null
    }

    const quantidade = Number(dados.quantidade)

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        throw new Error('Quantidade inválida!')
    }

    await produto.increment('quantidade', {
        by: quantidade
    })

    return produto
}
