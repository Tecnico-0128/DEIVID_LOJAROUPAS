import express from 'express'
import { cadastrar, listar, editar, remover } from '../controllers/clientesController.js'

const router = express.Router()

router.post('/', cadastrar)
router.get('/', listar)
router.put('/:id', editar)
router.delete('/:id', remover)

export default router