import express from 'express'
import { cadastrar, listar, adicionarEstoque } from '../controllers/produtosController.js'

const router = express.Router()

router.post('/', cadastrar)
router.get('/', listar)
router.put('/:id/estoque', adicionarEstoque)

export default router