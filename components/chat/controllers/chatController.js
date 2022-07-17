import { chatService } from '../services/chatService.js'
import logger from '../../../utils/logger/winston_config.js'

class Chat {

    async postChatMessage(req, res, next) {
        try {
            console.log(req.body)
            let response = await chatService.postChatMessage(req.body)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }

    }
 

    async getChatMessages(req, res, next) {
        try {
            let response = await chatService.getChatMessages(req.params.email)
            res.json(response)
        } catch (error) {
            logger.error(error)
        }
    }

   

}

export let chatController = new Chat()

