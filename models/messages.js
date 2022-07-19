import mongoose from "mongoose"

const messagesCollection = 'messages'

const MessagesSchema = mongoose.Schema({
    author: {
        id: {type: String, require: true},
        type: {type: String, require: true}
    },
    text: {type: String, require: true, max:500},
    date: {type: String, require: true},
    id: {type: Number, require: true, unique: true}
})

export const messages = mongoose.model(messagesCollection, MessagesSchema)