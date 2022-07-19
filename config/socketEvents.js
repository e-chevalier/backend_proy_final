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
                let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)
                io.to(room).emit('chat', messagesNormalized);
            })()
         });

        // socket.on('newMessage', (data) => {

        //     if (Object.keys(data).length !== 0 && re.test(data.author.id) && !Object.values(data.author).includes('') && data.text !== '') {
        //         (async () => {
        //             await messagesContainer.save(data)
        //             let messagesOriginal = await messagesContainer.getAll()
        //             let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)
        //             io.sockets.emit('messages', messagesNormalized)
        //             logger.info('¡NUEVO MENSAJE EMITIDO A TODOS LOS SOCKETS! PID: ' + process.pid)  // - Pedido 1
        //         })()
        //     }
        // })

        socket.on('chat', (data) => {

            const { newMessage, room } = data;

            if (Object.keys(newMessage).length !== 0 && re.test(newMessage.author.id) && !Object.values(newMessage.author).includes('') && newMessage.text !== '') {
                (async () => {
                    await messagesContainer.save(newMessage)
                    let messagesOriginal = await messagesContainer.getByEmail(room)
                    let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)
                    io.to(room).emit('chat', messagesNormalized);
                    logger.info(`msg: ${newMessage}, room: ${room}`)
                })()
            }
        })

       
    })

    return io
}