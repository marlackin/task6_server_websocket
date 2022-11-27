import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { WebSocketServer } from "ws";
import * as UserController from './UserController.js'

process.env.MONGODB_URI='mongodb+srv://admin:admin@cluster0.d2py2e4.mongodb.net/task4?retryWrites=true&w=majority'
process.env.PORT = 5000
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('DB OK'))
.catch((err)=>console.log('DB ERROR',err))

const app = express();
app.use(cors())

app.use(express.json())

const wss = new WebSocketServer({
    port: 7000,
}, () => console.log(`wss started on 7000`))



wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

app.post('/register',UserController.register)
app.post('/sendMessage',UserController.sendMessage)
app.get('/findMessage',UserController.findMessage)
app.post('/getAllUsers',UserController.getAllUsers)
app.post('/allUsersMessage',UserController.allUsersMessage)

app.listen(process.env.PORT = 5000,(err) =>{
    if (err) {
        console.error(err);
    }
    console.log('server listening on port 5000')
})