const express = require("express")

const server = express()

server.all("/", (req, res) => {
    res.send('On The Hill Notifications')
})

function keepAlive(){
    server.listen(3000, () => {
      console.log("On The Hill notifications active.")
    })
}

module.exports = keepAlive
