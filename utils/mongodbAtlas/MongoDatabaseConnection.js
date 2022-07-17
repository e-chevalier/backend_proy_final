import mongoose from "mongoose"
import { config } from '../../config/mongodbAtlas.js'
import logger from "../logger/winston_config.js"

const DB_PASS = config.db_pass
const DB_DOMAIN = config.db_domain
const DB_NAME = config.db_name
const DB_USER = config.db_user

class MongoDatabaseConnection {
    static clientMongoDB;

    constructor(){

        const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`
        const options = { useNewUrlParser: true, useUnifiedTopology: true }


        if (MongoDatabaseConnection.clientMongoDB) {
            //logger.info(Database.client)
            this.clientMongoDB = MongoDatabaseConnection.clientMongoDB;
            logger.info('MongoDB connected - currently connected !!')
        } else {
            MongoDatabaseConnection.clientMongoDB = mongoose.connect(URL, options)
            this.clientMongoDB = MongoDatabaseConnection.clientMongoDB
            logger.info('MongoDB connected - first time!!')
        }
    }
}

export default new MongoDatabaseConnection()