const http = require("http")
const mongoose = require("mongoose")

const app = require("./app")
const {loadPlanetsData} = require("./modals/planets.modal")

const MONGO_URL = "mongodb+srv://nasa-api:PnzsSHxFSmV6E02i@nasacluster.ztif9db.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!")
})

mongoose.connection.on("error", (err) => {
   console.error(`${err}`)
})

async function startServer() {
   await mongoose.connect(MONGO_URL)
   await loadPlanetsData()
  server.listen(PORT,()=> {
    console.log(`listening on port ${PORT}`)
})
}

startServer()
