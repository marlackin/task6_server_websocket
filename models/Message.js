import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        createdDate: new Date(),
    },
    userFrom:{
        type: String,
        required: true,
    },
    userTo:{
        type: String,
        required: true,
    },
    theme:{
        type: String,
        required: true
    },
}
)

export default mongoose.model('chat_message', MessageSchema)