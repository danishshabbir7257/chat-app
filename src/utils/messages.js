const getMessage = (text)=>{
   return {
        text,
        createdAt: new Date().getTime()

    }
}
module.exports = getMessage