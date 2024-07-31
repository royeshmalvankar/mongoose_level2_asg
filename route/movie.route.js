const express = require("express")
const Movie = require("../model/movieschema")

const movieRoutes = express.Router()

movieRoutes.post("/", async(req, res) => {
    try {
        let MovieAuth = await Movie.find({name:req.body.name,year:req.body.year, genre:req.body.genre, actors:req.body.actors, plot:req.body.plot}) 
        if(MovieAuth.length!=0){
         res.send({"message":"Movie already exists"})
         return
        }
        let movie =  new Movie(req.body)
        movie.save()
        res.status(201)
        res.json({"message":"movie added successfully","data":movie})
    } catch (error) {
        res.send(`The data is not valid "${error}" or some error occured`) 
    }
    })

movieRoutes.get("/",async(req,res)=>{
    try {
        let data = await Movie.find()
        // { name: { $regex: req.query.name, $options: "i" }
        res.status(200)
        res.json({"message":"success data fetched successfully","data":data})
    } catch (error) {
        res.status(400)
        console.log("Failed to fetch data",error)
    }
})

movieRoutes.put("/:id", async (req, res) => {
    const {id} = req.params
    try {
        let updatedMovie = await Movie.findByIdAndUpdate({ _id:id},req.body)
        res.status(200)
        res.json({"message":"success data updated successfully","data":updatedMovie})
    } catch (error) {
        res.status(400)
        console.log("Failed to update data",error)
    }
})

movieRoutes.patch("/:id",async (req, res) => {
    const {id} = req.params
    try {
        const patchdata = await Movie.findByIdAndUpdate({ _id:id},req.body)
        res.status(200)
        res.json({"message":"success data updated successfully","data":patchdata})
    } catch (error) {
        res.status(400)
        console.log("Failed to update data",error)
    }
    })

movieRoutes.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        let deletedMovie = await Movie.findByIdAndDelete({ _id:id})
        res.status(200)
        res.json({"message":"success data deleted successfully","data":deletedMovie})
    } catch (error) {
        res.status(400)
        console.log("Failed to delete data",error)
    }
    })

movieRoutes.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        let data = await Movie.findById({ _id:id})
        res.status(200)
        res.json({"message":"success data fetched successfully","data":data})
    } catch (error) {
        res.status(400)
        console.log("Failed to fetch data",error)
    }
    })

module.exports = movieRoutes