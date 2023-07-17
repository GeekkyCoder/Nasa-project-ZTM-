const http = require("http")
require("dotenv").config()
const { mongoConnect } = require("./services/mongo")

const app = require("./app")
const {loadPlanetsData} = require("./modals/planets.modal")
const {loadLaunchData} = require("./modals/launches.modal")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
   await mongoConnect()
   await loadPlanetsData()
   await loadLaunchData()
  server.listen(PORT,()=> {
    console.log(`listening on port ${PORT}`)
})
}

startServer()
