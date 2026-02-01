const server = require('./config/app')
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`listenting on http://localhost:${port}`)
})