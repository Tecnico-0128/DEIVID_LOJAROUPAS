
import express from 'express'
import sequelize from './config/database.js'

import clientesRoutes from './routes/clientes.js'
import produtosRoutes from './routes/produtos.js'
import vendasRoutes from './routes/vendas.js'

const app = express()

app.use(express.json())


app.use('/clientes', clientesRoutes)
app.use('/produtos', produtosRoutes)
app.use('/vendas', vendasRoutes)

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    })
})


app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
// next()
})
try {
    await sequelize.authenticate()
    console.log('Conexão com o banco de dados realizada!')

    await sequelize.sync()

    app.listen(3000, () => {
        console.log('Servidor iniciado na porta 3000.')
    })
} catch (erro) {
    console.error('Falha ao iniciar:', erro)
    process.exit(1)
}
