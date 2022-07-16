import 'dotenv/config'

let config = {
    port: process.env.PORT
}

let db = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce'
}

export { config, db }