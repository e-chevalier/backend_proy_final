import { ContenedorMongoDB } from '../../utils/containers/ContenedorMongoDB.js'
import * as modelMessages from '../../models/messages.js'

class MessagesDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super(modelMessages.messages)
    }

    /**
     * Métodoque recibe un ID y devuelve el objeto con ese ID o null si no está.
     * @param {*} email
     * @returns 
     */
     async getByEmail(email) {
        try {
            let res = await this.db.find({ 'author.id': email }, { '_id': 0, '__v': 0 }).lean()
            return res

        } catch (error) {
            logger.error(error)
        }
    }

}

export default MessagesDaoMongoDB