
import clientes from '../models/clientes.js'

export async function cadastrar(dados) {
    console.log(dados)
    return await clientes.create({
        nome: dados.Nome,
        cpf: dados.CPF
    })
}

export async function listar() {
    return await clientes.findAll()
}

export async function editar(id, dados) {
    const cliente = await clientes.findByPk(id)
    if (!cliente) {
        return null
    }

    await cliente.update({
        nome: dados.nome
    })

    return cliente
}

export async function remover(id) {
    const cliente = await clientes.findByPk(id)
    if (!cliente) {
        return null
    }

    await cliente.destroy()

    return cliente
}
