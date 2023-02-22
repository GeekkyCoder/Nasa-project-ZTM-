const express = require("express")
const cors = require("cors")
const path = require("path")
const morgan = require("morgan")

const planetsRouter = require("./routes/planets/planets.router")
const launchesRouter = require("./routes/launches/launches.router")

// const {httpGetAllLaunches,httpAddNewlaunch} = require("./routes/launches/launches.controller")


const app = express()

app.use(cors({
    origin:"http://localhost:3000"
}))

//* custom middleware for logging request
// app.use((req,res,next) => {
//     next()
//     console.log(`${req.method}${req.baseUrl}${req.url}`)
// })

//* morgan middlware for logging request information coming in
app.use(morgan("combined"))

app.use(express.json())
app.use(express.static(path.join(__dirname,"..","public")))



app.use("/planets",planetsRouter )
// app.use("/launches",httpGetAllLaunches)
// app.use("/launches",httpAddNewlaunch)
app.use("/launches",launchesRouter)

app.get("/*",(req,res) => {
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})

module.exports = app