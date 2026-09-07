// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const Fruit = require('./models/Fruit')







// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT




async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()




















// Routes go here

app.get('/',(req,res)=>{
    res.render('homepage.ejs')
})
 

// Create
app.get('/fruits/new',(req,res)=>{
    res.render('create-fruit.ejs')
})

 
app.post('/fruits', async (req,res)=>{
    req.body.isReadyToEat = Boolean(req.body.isReadyToEat)
    console.log(req.body)
    const createdFruit = await Fruit.create({
        name: req.body.name,
        isReadyToEat: req.body.isReadyToEat
    })
    res.redirect('/')
})

// READ
 
app.get('/fruits',async(req,res)=>{
    const allFruits = await Fruit.find()
    res.render('all-fruits.ejs',{fruits: allFruits})
})

app.get('/fruits/:fruitId', async (req,res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render('fruit-details.ejs',{fruit: foundFruit})
})

app.post('/fruits/:fruitId/delete', async (req,res)=>{
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect('/fruits')
})



// Update routes

app.get('/fruits/:fruitId/edit', async(req,res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render('update-fruit.ejs',{fruit: foundFruit})
})

app.post('/fruits/:fruitId/edit', async (req,res)=>{
    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.fruitId,req.body)
    res.redirect('/fruits')
})


// Exercise 2:
// 1. Make an ejs page all-fruits.ejs and add h1 inside that says "All Fruits"
// 2. create a get route on /fruits
// 3. This route should render the all-fruits.ejs page


app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000