import logger from '../utils/logger/winston_config.js'
import ProductsDaoMemory from './products/ProductsDaoMemory.js'
import CartsDaoMemory from './carts/CartsDaoMemory.js'
import ProductsDaoMongoDB from './products/ProductsDaoMongoDB.js'
import CartsDaoMongoDB from './carts/CartsDaoMongoDB.js'
import MongoDatabaseConnection from '../utils/mongodbAtlas/MongoDatabaseConnection.js'


class DaoFactory {

    async init() {

        try {
            logger.info("Initializing container for MongoDB Atlas")
           
            // PRODUCTS DAO MONGODB
            const productsContainer = new ProductsDaoMongoDB()
            // CARTS DAO MONGODB
            const cartsContainer = new CartsDaoMongoDB()
    
            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())
    
            return { productsContainer, productsMemory, cartsContainer, cartsMemory }
    
        } catch (error) {
            logger.error(error)
        }
    }

}

export default DaoFactory;
