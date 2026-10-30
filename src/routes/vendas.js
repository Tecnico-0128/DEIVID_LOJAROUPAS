import express from 'express'
import { listar, vender } from '../controllers/vendasController.js'

const router = express.Router()

router.get('/', listar)
router.post('/', vender)

export default router