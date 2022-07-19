import { Server as IOServer } from 'socket.io'
import { normalize, schema } from "normalizr"
import DaoFactory from '../daos/DaoFactory.js'
import logger from '../utils/logger/winston_config.js'

/**
 *  Regular expression for check email
 */

const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i



/**
 * Normalizr Schemas 
 * 
 */

const authorSchema = new schema.Entity('author')

const messageSchema = new schema.Entity('message', {
    author: authorSchema
})

const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
})


export const serverSocketsEvents = async (httpsServer) => {

    const io = new IOServer(httpsServer)
    const daoFactory = new DaoFactory()
    const { messagesMemory, messagesContainer } = await daoFactory.init()


    io.on('connection', (socket) => {
        
        socket.on('join', (room) => {
            (async () => {
                logger.info(`Socket ${socket.id} joining ${room}`);
                socket.join(room);

                let messagesOriginal = await messagesContainer.getByEmail(room)
                let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal.reverse() }, messagesSchema)
                io.to(room).emit('chat', messagesNormalized);
            })()
         });

       
        socket.on('chat', (data) => {

            const { newMessage, room } = data;

            if (Object.keys(newMessage).length !== 0 && re.test(newMessage.author.id) && !Object.values(newMessage.author).includes('') && newMessage.text !== '') {
                (async () => {
                    await messagesContainer.save(newMessage)
                    let messagesOriginal = await messagesContainer.getByEmail(room)
                    let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal.reverse() }, messagesSchema)
                    io.to(room).emit('chat', messagesNormalized);
                    logger.info(`msg: ${newMessage}, room: ${room}`)
                })()
            }
        })

       
    })

    return io
}