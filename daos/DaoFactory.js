import logger from '../utils/logger/winston_config.js'
import ProductsDaoMemory from './products/ProductsDaoMemory.js'
import CartsDaoMemory from './carts/CartsDaoMemory.js'
import ProductsDaoMongoDB from './products/ProductsDaoMongoDB.js'
import CartsDaoMongoDB from './carts/CartsDaoMongoDB.js'
import MessagesDaoMemory from './messages/MessagesDaoMemory.js'
import MessagesDaoMongoDB from './messages/MessagesDaoMongoDB.js'
import MongoDatabaseConnection from '../utils/mongodbAtlas/MongoDatabaseConnection.js'


class DaoFactory {

    async init() {

        try {
            logger.info("Initializing container for MongoDB Atlas")
           
            // PRODUCTS DAO MONGODB
            const productsContainer = new ProductsDaoMongoDB()
            // CARTS DAO MONGODB
            const cartsContainer = new CartsDaoMongoDB()
             // MESSAGES DAO MONGODB
             const messagesContainer = new MessagesDaoMongoDB()
    
            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            // CARTS DAO MEMORY
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())
            // MESSAGES DAO MEMORY
             const messagesMemory = new MessagesDaoMemory(await messagesContainer.getAll())
    

           
           
            return { productsContainer, productsMemory, cartsContainer, cartsMemory, messagesContainer, messagesMemory }
    
        } catch (error) {
            logger.error(error)
        }
    }

}

export default DaoFactory;
