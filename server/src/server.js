const http = require("http")

const app = require("./app")
const {loadPlanetsData} = require("./modals/planets.modal")

const MONGO_URL = "mongodb+srv://nasa-api:PnzsSHxFSmV6E02i@nasacluster.ztif9db.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
   await loadPlanetsData()
  server.listen(PORT,()=> {
    console.log(`listening on port ${PORT}`)
})
}

startServer()
