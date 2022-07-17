import express from 'express'
import { chatController }  from './controllers/chatController.js'

export const chatApi = (app) => {
    let router = express.Router()
    app.use('/api/chat', router )

    router.post('/', chatController.postChatMessage)
    router.get('/:email', chatController.getChatMessages)
}