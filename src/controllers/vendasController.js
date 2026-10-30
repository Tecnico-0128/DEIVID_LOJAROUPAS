
import clientes from '../models/clientes.js'
import produtos from '../models/produtos.js'
import vendas from '../models/vendas.js'
import sequelize from '../config/database.js'

export async function listar(req, res) {
    try {
        const lista = await vendas.findAll()

        res.json(lista)
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao listar vendas' })
    }
}

export async function vender(req, res) {
    const transacao = await sequelize.transaction()

    try {
        const cliente = await clientes.findByPk(req.body.cliente_id, {
            transaction: transacao
        })

        const produto = await produtos.findByPk(req.body.produto_id, {
            transaction: transacao,
            lock: transacao.LOCK.UPDATE
        })

        const quantidade = Number(req.body.quantidade)

        if (!cliente || !produto) {
            await transacao.rollback()
            return res.status(404).json({
                mensagem: 'Cliente ou produto não encontrado'
            })
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            await transacao.rollback()
            return res.status(400).json({
                mensagem: 'Quantidade inválida'
            })
        }

        if (produto.quantidade < quantidade) {
            await transacao.rollback()
            return res.status(400).json({
                mensagem: 'Quantidade insuficiente no estoque'
            })
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

        res.status(201).json({
            mensagem: 'Venda efetuada com sucesso!',
            venda: venda
        })
    } catch (erro) {
        await transacao.rollback()

        res.status(500).json({ mensagem: 'Erro ao efetuar venda' })
    }
}
