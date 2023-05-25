const express = require('express')
require('dotenv').config()
require("./utils/database");
const cors = require('cors')
const userRouter = require('./app/User/Route')
const postRouter = require('./app/Posts/Route')
const commentRouter = require('./app/Comment/Route')
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)

app.listen(PORT,()=>{
    console.log(`App is listening on port : ${PORT}`);
})

module.exports = app;