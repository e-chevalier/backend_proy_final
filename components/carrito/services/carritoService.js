import DaoFactory from '../../../daos/DaoFactory.js'
import logger from '../../../utils/logger/winston_config.js'
import twilio_config from '../../../config/twilio.js'
import sendMessage from '../../../utils/twilio/twilio.js'

const daoFactory = new DaoFactory()
const { productsMemory, cartsContainer, cartsMemory } = await daoFactory.init()


class Carrito {

    async postCarrito() {
        try {
            //logger.info(`POST CrearCarrito-- cartsRouters`)
            let newCartID = await cartsMemory.save({ products: [] })
            //Save to DAO Container
            cartsContainer.save({ products: [] })

            return { status: "OK", description: "POST CREATE CART RETURN ID", id: newCartID }
            
        } catch (error) {
            logger.error(error)
        }
    }

    async putCarritoOwner(id_cart, email) {
        try {
           await cartsMemory.updateById(id_cart, { email: email })
           //Save to DAO Container
           cartsContainer.updateById(id_cart, { email: email })
           return { status: "OK", description: `PUT OWNER EMAIL: ${email} INTO ID_CART: ${id_cart}` }
            
        } catch (error) {
            logger.error(error)
        }
    }


    

    async deleteCarrito(id) {
        try {
            //logger.info(`DELETE Carrito => id: ${id} -- cartsRouters`)
            let index = await cartsMemory.deleteById(id)

            if (index >= 0) {
                //Save to DAO Container
                await cartsContainer.deleteById(id)
            }

            return (index >= 0 ? { status: "OK", description: `DELETE CART WITH ID: ${id}`, id: id } : { error: 'Carrito no encontrado.' })

        } catch (error) {
            logger.error(error)
        }
    }

    async getCarritoProductos(id) {
        try {
            //logger.info(`GET Productos => id: ${id} -- cartsRouters`)

            let cart = await cartsMemory.getById(id)

            return (cart ? { status: "OK", description: `GET CART WITH ID: ${id}`, cart: cart } : { error: 'Carrito no encontrado.' })

        } catch (error) {
            logger.error(error)
        }
    }

    async postCarritoProducto(id_cart, id_prod, qty) {
        try {
            //logger.info(`POST Carrito Add PROD  => idCart: ${id_cart} id_prod: ${id_prod} qty: ${qty}-- cartsRouters`)

            let cart = await cartsMemory.getById(id_cart)
            let prod = await productsMemory.getById(id_prod)

            let response = {}

            if (cart) {
                if (prod) {

                    let index = cart.products.findIndex(prod => prod.id == id_prod)
                    let newProd = {}

                    if (index >= 0) {
                        newProd = Object.assign(prod, { qty: cart.products[index].qty + Number(qty) })
                        cart.products[index] = newProd
                    } else {
                        newProd = Object.assign(prod, { qty: Number(qty) })
                        cart.products.push(newProd)
                    }

                    //ADD PROD TO THE CART ON MEMORY CONTAINER
                    await cartsMemory.updateById(id_cart, { products: cart.products })
                    //Save to DAO Container
                    cartsContainer.updateById(id_cart, { products: cart.products })
                    response = { status: "OK", description: `POST ADD ID_PROD: ${id_prod} INTO ID_CART: ${id_cart}` }
                } else {
                    response = { error: `Producto ID:${id_prod} no encontrado.` }
                }
            } else {
                response = { error: `Carrito ID:${id_cart} no encontrado.` }
            }

            return response

        } catch (error) {
            logger.error(error)
        }
    }


    async deleteCarritoProducto(id_cart, id_prod) {
        try {
            //logger.info(`DELETE Productos IDPROD: ${id_prod}  FROM CART ID: ${id_cart} -- cartsRouters`)

            let cart = await cartsMemory.getById(id_cart)
            let response = {}
            let index_prod = -1

            if (cart) {

                index_prod = cart.products.findIndex(prod => Number(prod.id) == Number(id_prod))

                if (index_prod >= 0) {  // Prod id on cart
                    cart.products.splice(index_prod, 1) // Remove prod from cart
                    await cartsMemory.updateById(id_cart, { products: cart.products })
                    response = { status: "OK", description: `DELETE ID_PROD: ${id_prod} FROM ID_CART: ${id_cart}` }
                    //Save to DAO Container
                    cartsContainer.updateById(id_cart, { products: cart.products })
                } else {
                    response = { error: `Producto ID:${id_prod} no encontrado en el carrito ID:${id_cart} .` }
                }
            } else {
                response = { error: `Carrito ID:${id_cart} no encontrado.` }
            }

            return (response)

        } catch (error) {
            logger.error(error)
        }
    }
    
    async confirmOrder(body) {
        try {

            let { cartId, shoopingList, subTotal, shippingCost, user } = body
            console.log(body)


            // let cart = await cartsMemory.getById(id)

            // console.log(cart)

            const toNumberWhatsapp = twilio_config.TONUMBERWHATSAPP
            const toNumberSMS = twilio_config.TONUMBERSMS
            let bodyWhatsapp = 'Your appointment is coming up on July 21 at 3PM'
            let bodySms = 'Su pedido ha sido recibido y se encuentra en preparacion.'


            //sendMessage('sms', toNumberSMS, bodySms)
            sendMessage('whatsapp', toNumberWhatsapp, bodyWhatsapp)

            return {status: 'Order confirmed', cartId: cartId}

        } catch (error) {
            logger.error(error)            
        }
    }


}

export let carritoService = new Carrito()

