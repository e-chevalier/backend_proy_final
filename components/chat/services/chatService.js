import DaoFactory from '../../../daos/DaoFactory.js'
import logger from '../../../utils/logger/winston_config.js'

const daoFactory = new DaoFactory()
const { messagesMemory, messagesContainer } = await daoFactory.init()


class Chat {

    async postChatMessage(newMessage) {
        try {
            //logger.info(`POST CrearCarrito-- cartsRouters`)
            console.log(newMessage)
            let newMessagesID = await messagesMemory.save(newMessage)
            console.log(newMessagesID)
            //Save to DAO Container
            messagesContainer.save(newMessage)

            return { status: "OK", description: "POST CREATE NEW MESSAGE RETURN ID", id: newMessagesID }
            
        } catch (error) {
            logger.error(error)
        }
    }

 
    async getChatMessages(email) {
        try {
            //logger.info(`GET Productos => id: ${id} -- cartsRouters`)
            let messages = await messagesContainer.getByEmail(email)

            return ({ status: "OK", description: `GET CHATS WITH EMAIL: ${email}`, messages: messages })

        } catch (error) {
            logger.error(error)
        }
    }
   
}

export let chatService = new Chat()

