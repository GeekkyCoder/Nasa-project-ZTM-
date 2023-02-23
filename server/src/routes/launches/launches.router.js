const express = require("express")
const {httpGetAllLaunches,httpAddNewlaunch,httpAbortLaunch} = require("./launches.controller")

const launchesRouter = express.Router()

launchesRouter.get("/", httpGetAllLaunches)
launchesRouter.post("/", httpAddNewlaunch)
launchesRouter.delete("/:flightNumber", httpAbortLaunch)


module.exports = launchesRouter