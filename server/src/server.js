const http = require("http")
const mongoose = require("mongoose")

require("dotenv").config()

const app = require("./app")
const {loadPlanetsData} = require("./modals/planets.modal")
const {loadLaunchData} = require("./modals/launches.modal")


const MONGO_URL = process.env.MONGO_URL

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
   await loadLaunchData()
  server.listen(PORT,()=> {
    console.log(`listening on port ${PORT}`)
})
}

startServer()
