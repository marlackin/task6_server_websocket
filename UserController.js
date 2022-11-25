import User from './models/User.js'
import Message from './models/Message.js'


export const register = async(req, res) => {
    try{
        const userBd = await User.findOne({userName:req.body.userName})
        // const userBd = await User.find({}).lean().orFail()
        if(!userBd){
            const doc = new User({
                userName:req.body.userName,
            })
            const user = await doc.save()
        
            const {...userData} = user._doc
            console.log('первый иф')
            return res.json({
                ...userData,
            })
        }
        if(userBd.userName = req.body.userName){
            const userBd = await User.findOne({userName:req.body.userName})
            const {...userData} = userBd
            console.log('второй иф')
            return res.json({
                message:"success"
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать пользователя'
        })
    }
}

export const sendMessage = async(req, res) => {
    try{
        console.log(req.body)
        const doc = new Message({
            userFrom:req.body.userFrom,
            userTo:req.body.userTo,
            message:req.body.message,
            theme:req.body.theme,
            date:req.body.date,
        })
        console.log(doc)
        const message = await doc.save()
        const {...messageData} = message._doc
            console.log('первый иф')
            return res.json({
                ...messageData,
            })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не отправить сообщение'
        })
    }
}

export const findMessage = async(req, res) => {
    try{
        const messages = await Message.find({userFrom:{$in:req.body.userName},userTo:{$in:req.body.userTo}}).lean().orFail()
        res.json({
            ...messages,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не отправить сообщение'
        })
    }
}
export const allUsersMessage = async(req, res) => {
    try{
        const messagesFrom = await Message.find({userFrom:{$in:req.body.userName} || {userTo:{$in:req.body.userName}}}).lean().orFail()
        const messagesTo = await Message.find({userTo:{$in:req.body.userName}} || {userFrom:{$in:req.body.userName}}).lean().orFail()
        res.json([
            ...messagesFrom,
            ...messagesTo
        ])
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не отправить сообщение'
        })
    }
}
export const getAllUsers = async(req, res) => {
    try{
        console.log(req.body.userName)
        const users = await User.find({userName:{$ne:req.body.userName}}).lean().orFail()
        res.json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Не отправить сообщение'
        })
    }
}