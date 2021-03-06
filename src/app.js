import express from 'express' 
import morgan from 'morgan'
import pkg from '../package.json'
import productsRouters from './routes/products.routes'
import authRouters from './routes/auth.routes'
import {createRoles} from './libs/initialSetup'
import userRoutes from './routes/user.routes'
import cors from 'cors'
const app=express()
createRoles();


app.use(cors());
app.set('pkg',pkg);
app.use(express.json());


app.use(morgan('dev')); 

app.get('/',(req,res)=>{
    res.json({
        name: app.get('pkg').name,
        author:app.get('pkg').author,
        description:app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productsRouters)

app.use('/api/auth', authRouters)
app.use('/api/users', userRoutes)

export default app;