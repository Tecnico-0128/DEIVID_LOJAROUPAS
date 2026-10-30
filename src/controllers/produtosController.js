
import produtos from '../models/produtos.js'

export async function cadastrar(req, res) {
    try {
        const produto = await produtos.create({
            produto: req.body.produto,
            quantidade: req.body.quantidade,
            preco: req.body.preco
        })

        res.status(201).json(produto)
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar produto' })
    }
}

export async function listar(req, res) {
    try {
        const lista = await produtos.findAll()

        res.json(lista)
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao listar produtos' })
    }
}

export async function adicionarEstoque(req, res) {
    try {
        const produto = await produtos.findByPk(req.params.id)

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        }

        const quantidade = Number(req.body.quantidade)

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return res.status(400).json({ mensagem: 'Quantidade inválida!' })
        }

        await produto.increment('quantidade', { by: quantidade })

        res.json({ mensagem: 'Estoque atualizado com sucesso!' })
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao adicionar estoque' })
    }
}
