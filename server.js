const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 9090

const home = {
    Name: 'OurBlog',
    Type: 'Website',
    DevelopedBy: 'Profit'
}

app.get('/', (req, res) => {
    res.send(home)
})

const url = ''


app.listen(port, () => {
    console.log(`listenting on http://localhost:${port}`)
})