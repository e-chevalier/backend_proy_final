import logger from '../utils/logger/winston_config.js'

const container_type = process.env.npm_config_container_type ? process.env.npm_config_container_type : 'mongodb'
logger.info("------------------ OPCIONES DE CONTENEDOR --------------------------------")
logger.info("npm run dev --container_type=[file, firestore, mongodb, mysql, sqlite3]")
logger.info("--------------------------------------------------------------------------")
logger.info("Container Type Selected : " + container_type)


async function dynamicImport(container_type) {

    try {
        // DAO MEMORY DEFAULT
        const { default: ProductsDaoMemory } = await import('./products/ProductsDaoMemory.js')
        const { default: CartsDaoMemory } = await import('./carts/CartsDaoMemory.js')

        if (container_type.toUpperCase() === 'firestore'.toUpperCase()) {
            logger.info("Initializing container for Firestore")
            const { default: ProductsDaoFireStore } = await import('./products/ProductsDaoFireStore.js')
            const { default: CartsDaoFireStore } = await import('./carts/CartsDaoFireStore.js')

            // PRODUCTS DAO FIRESTORE
            const productsContainer = new ProductsDaoFireStore()
            // CARTS DAO FIRESTORE
            const cartsContainer = new CartsDaoFireStore()

            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())

            return { productsContainer, productsMemory, cartsContainer, cartsMemory }

        } else if (container_type.toUpperCase() === 'mysql'.toUpperCase()) {
            logger.info("Initializing container for Mysql")
            // KNEX Config
            const { config_db } = await import('../config/databaseKnex.js')
            const { default: ProductsDaoKnex } = await import('./products/ProductsDaoKnex.js')
            const { default: CartsDaoKnex } = await import('./carts/CartsDaoKnex.js')

            // PRODUCTS DAO KNEX MYSQL
            const productsContainer = new ProductsDaoKnex(config_db.mysql)
            await productsContainer.createTableProducts()
            // CARTS DAO KNEX MYSQL
            const cartsContainer = new CartsDaoKnex(config_db.mysql)
            await cartsContainer.createTableCarts()

            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())

            return { productsContainer, productsMemory, cartsContainer, cartsMemory }

        } else if (container_type.toUpperCase() === 'sqlite3'.toUpperCase()) {
            logger.info("Initializing container for Sqlite3")
            // KNEX Config
            const { config_db } = await import('../config/databaseKnex.js')
            const { default: ProductsDaoKnex } = await import('./products/ProductsDaoKnex.js')
            const { default: CartsDaoKnex } = await import('./carts/CartsDaoKnex.js')

            // PRODUCTS DAO KNEX SQLITE3
            const productsContainer = new ProductsDaoKnex(config_db.sqlite3)
            await productsContainer.createTableProducts()
            // CARTS DAO KNEX SQLITE3
            const cartsContainer = new CartsDaoKnex(config_db.sqlite3)
            await cartsContainer.createTableCarts()

            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())

            return { productsContainer, productsMemory, cartsContainer, cartsMemory }

        } else if (container_type.toUpperCase() === 'mongodb'.toUpperCase()) {
            logger.info("Initializing container for MongoDB Atlas")
            const { default: ProductsDaoMongoDB } = await import('./products/ProductsDaoMongoDB.js')
            const { default: CartsDaoMongoDB } = await import('./carts/CartsDaoMongoDB.js')
            // MONOGODB ATLAS CONNECTION
            const { connectMongodbAtlas } = await import('../utils/mongodbAtlas/mongodbAtlas.js')

            // Connnect to dabase
            await connectMongodbAtlas()
            // PRODUCTS DAO MONGODB
            const productsContainer = new ProductsDaoMongoDB()
            // CARTS DAO MONGODB
            const cartsContainer = new CartsDaoMongoDB()

            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())

            return { productsContainer, productsMemory, cartsContainer, cartsMemory }

        } else { // default File
            logger.info("Initializing container for File")
            const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js')
            const { default: CartsDaoFile } = await import('./carts/CartsDaoFile.js')

            // PRODUCTS DAO FILE
            const productsContainer = new ProductsDaoFile()
            // CARTS DAO FILE
            const cartsContainer = new CartsDaoFile()

            // PRODUCTS DAO MEMORY
            const productsMemory = new ProductsDaoMemory(await productsContainer.getAll())
            const cartsMemory = new CartsDaoMemory(await cartsContainer.getAll())

            return { productsContainer, productsMemory, cartsContainer, cartsMemory }
        }

    } catch (error) {
        logger.error(error)
    }
}

const { productsContainer, productsMemory, cartsContainer, cartsMemory } = await dynamicImport(container_type)

export { productsContainer, productsMemory, cartsContainer, cartsMemory }
