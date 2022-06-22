import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import floorRouter from './routers/floorRouter.js';
import userRouter from './routers/userRouter.js';
import path from 'path';
import orderRouter from './routers/orderRouter.js';


dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('connected'))
.catch(e=>console.log(e));

app.use('/api/floors', floorRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

app.get('/', (req, res) => {
    res.send('server is ready')
})
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})