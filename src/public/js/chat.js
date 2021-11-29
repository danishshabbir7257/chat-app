const socket=io()

const message_template = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

const message_display = document.querySelector('#message_display')
const geolocation = document.querySelector('#btnlocation')
const form_message = document.querySelector('#form_message')
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true})
form_message.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = document.querySelector('input').value
    document.querySelector('input').value=''
    socket.emit('send',message,()=>{
        console.log('Message delivered')
    })
})
socket.on('message',(message)=>{
    message=message.text
    const createdAt = moment(message.createdAt).format('h:mm:s')
    console.log(message)
const html = Mustache.render(message_template,{createdAt,message})
message_display.insertAdjacentHTML('beforeend',html)

})

 geolocation.addEventListener('click',(e)=>{
     if(!navigator.geolocation.getCurrentPosition)
     {
         alert("can't get location")
         return
     }
     navigator.geolocation.getCurrentPosition((position)=>{
        const location={
            lat:position.coords.latitude,
            long:position.coords.longitude
        } 
        socket.emit('geolocation',location,()=>{
            console.log("sent location")

        })
     })
 })
 socket.on('location_message',(url)=>{
    console.log(url)
    const html = Mustache.render(locationMessageTemplate, {
        url
    })
    message_display.insertAdjacentHTML('beforeend',html)
})
socket.emit('join',username,room,(error)=>{
    alert(error)
    location.href = '/'
})