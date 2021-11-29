const users =[]
const addUser =({id,username,room})=>{
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    if(!username || !room)
    {
        return {error: 'Username and room name required'}
    }
    const isUser = users.find((user)=>{
        return user.username === username && user.room === room
    })
    if(isUser)
    {
        return {error: 'User with same username already exist in this room'}
    }
    const user = {id,username,room}
    users.push(user)
    return {user}
}
const removeUser = (id) => {
    const index = users.indexOf((user)=> user.id ===id)
    if(index !== -1)
    {
        users.splice(index, 1)[0] 
    }
}
const getUser = (id) => {
    return users.find((user)=> user.id === id)
}
const getUsersinRoom = (room) => {
    return users.filter((user)=> user.room === room)
}
module.exports ={
    addUser,
    removeUser,
    getUser
}