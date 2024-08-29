import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "../routes/users.js"
import { recipesRouter } from "../routes/recipes.js"


const app= express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use('/auth',userRouter) 
app.use("/recipes",recipesRouter)

app.listen(`${port}`,()=>{
    console.log('server starting');
    
})

mongoose.connect('mongodb+srv://hikmatawde566:DEogBSrNB3BXHowD@recipes.iifogz2.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes')