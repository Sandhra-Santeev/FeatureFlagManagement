require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router')
require('./connection')
const ffServer = express()
ffServer.use(cors())
ffServer.use(express.json())
ffServer.use(router)
const PORT = 4000 || process.env.PORT
ffServer.listen(PORT,()=>{
    console.log(`Server is running successfully at PORT ${PORT}`)
})
