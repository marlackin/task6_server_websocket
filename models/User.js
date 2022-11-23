import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    }
},
)

export default mongoose.model('Chat_user', UserSchema)