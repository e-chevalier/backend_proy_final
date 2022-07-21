import express from 'express'
import { productosController }  from './controllers/productosController.js'
import auth from '../../utils/auth/auth.js'

export const productosApi = (app) => {
    let router = express.Router()
    app.use('/api/productos', router )

    router.get('/:id?', productosController.getProductos)
    router.post('/',auth , productosController.postProductos)
    router.put('/:id', auth, productosController.putProductos)
    router.delete('/:id', auth, productosController.deleteProductos)
}
