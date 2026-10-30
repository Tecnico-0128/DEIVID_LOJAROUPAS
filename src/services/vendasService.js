
import clientes from '../models/clientes.js'
import produtos from '../models/produtos.js'
import vendas from '../models/vendas.js'
import sequelize from '../config/database.js'

export async function listar() {
    return await vendas.findAll()
}

export async function vender(dados) {
    const transacao = await sequelize.transaction()

    try {
        const cliente = await clientes.findByPk(dados.cliente_id, {
            transaction: transacao
        })

        const produto = await produtos.findByPk(dados.produto_id, {
            transaction: transacao,
            lock: transacao.LOCK.UPDATE
        })

        const quantidade = Number(dados.quantidade)

        if (!cliente || !produto) {
            throw new Error('Cliente ou produto não encontrado!')
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw new Error('Quantidade inválida!')
        }

        if (produto.quantidade < quantidade) {
            throw new Error('Quantidade insuficiente no estoque!')
        }

        await produto.decrement('quantidade', {
            by: quantidade,
            transaction: transacao
        })

        const venda = await vendas.create({
            cliente_id: cliente.id,
            produto_id: produto.id,
            quantidade: quantidade
        }, {
            transaction: transacao
        })

        await transacao.commit()

        return venda

    } catch (erro) {
        await transacao.rollback()
        throw erro
    }
}
