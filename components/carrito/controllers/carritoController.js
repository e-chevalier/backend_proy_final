import { carritoService } from '../services/carritoService.js'
import logger from '../../../utils/logger/winston_config.js'

class Carrito {
    async postCarrito(req, res, next) {
        try {
            let response = await carritoService.postCarrito()
            res.json(response)
        } catch (error) {
            logger.error(error)
        }

    }

    async putCarritoOwner(req, res, next) {
        try {
            let response = await carritoService.putCarritoOwner(req.params.id, req.params.email)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }

    }

    async deleteCarrito(req, res, next) {
        try {
            let response = await carritoService.deleteCarrito(req.params.id)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async getCarritoProductos(req, res, next) {
        try {
            let response = await carritoService.getCarritoProductos(req.params.id)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async postCarritoProducto(req, res, next) {
        try {
            let response = await carritoService.postCarritoProducto(req.params.id, req.body.id_prod, req.body.qty)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteCarritoProducto(req, res, next) {
        try {
            let response = await carritoService.deleteCarritoProducto(req.params.id, req.params.id_prod)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

    async confirmOrder(req, res, next) {
        try {
            
            let response = await carritoService.confirmOrder(req.body)
            res.json(response)

        } catch (error) {
            logger.error(error)            
        }
    }

}

export let carritoController = new Carrito()

