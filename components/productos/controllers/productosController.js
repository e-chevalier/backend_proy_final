import { productosService } from '../services/productosService.js'
import logger from '../../../utils/logger/winston_config.js'

class Productos {


    async getProductos(req, res, next) {
        try {
            let response = await productosService.getProductos(req.params.id)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async postProductos(req, res, next) {
        try {
            let response = await productosService.postProductos(req.body)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async putProductos(req, res, next) {
        try {
            let response = await productosService.putProductos(req.params.id, req.body)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteProductos(req, res, next) {
        try {
            let response = await productosService.deleteProductos(req.params.id)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }
}

export let productosController = new Productos()