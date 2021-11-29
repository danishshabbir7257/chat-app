const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const getMessage = require('./utils/messages')
const {addUser, removeUser, getUser} = require('./utils/users')

const app = express()
const publicdirectory = path.join(__dirname, './public')
app.use(express.static(publicdirectory))
const server = http.createServer(app)
const io = socketio(server)

io.on('connection',(socket)=>{
console.log('connection established')
socket.on('join',(username,room,callback)=>{
    id =socket.id
    const { error, user} = addUser({id,username,room})
    if(error)
    {
        return callback(error)
    }
    socket.join(user.room)
    socket.emit('message', getMessage('welcome!'))
    socket.broadcast.to(user.room).emit('message',getMessage(user.username+' has join'))
    
    
})

socket.on('send',(message,callback)=>{ 
    const user = getUser(socket.id)
    if(user)
    {
        io.to(user.room).emit('message', getMessage(message))  
        callback()
    }
   
}) 
socket.on('geolocation',(location,callback)=>{ 
    const user = getUser(socket.id)
    if(user)
    {
        const url = "https://google.com/maps?q="+location.lat + ","+location.long
        socket. to(user.room).emit('location_message',url)
        callback()
    }
 
})
 

    socket.on('disconnect',()=>{
        const removedUser = removeUser(socket.id)
        if(removedUser)
        {
            io.to(removedUser.room).emit('message',getMessage(removedUser.username+' has disconnected'))
        }
        
    })
})
const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`listening on port ${port}`)
})