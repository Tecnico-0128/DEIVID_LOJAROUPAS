
import clientes from '../models/clientes.js'

export async function cadastrar(req, res) {
    console.log(req.body)
    try {
        const cliente = await clientes.create({
            nome: req.body.Nome,
            cpf: req.body.CPF
        })

        res.status(201).json(cliente)
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar cliente' })
    }
}

export async function listar(req, res) {
    try {
        const lista = await clientes.findAll()

        res.json(lista)
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao listar clientes' })
    }
}

export async function editar(req, res) {
    try {
        const cliente = await clientes.findByPk(req.params.id)
        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }
        await cliente.update({
            nome: req.body.nome
        })

        res.json({ mensagem: 'Nome do cliente editado com sucesso!' })
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao editar cliente' })
    }
}

export async function remover(req, res) {
    try {
        const cliente = await clientes.findByPk(req.params.id)

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }
        
        await cliente.destroy()

        res.json({ mensagem: 'Cliente removido com sucesso!' })
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao remover cliente' })
    }
}
