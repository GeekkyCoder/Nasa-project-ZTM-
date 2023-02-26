const {getAllLaunches,scheduleNewLaunch,existLaunchWithId,abortLaunchWithId} = require("../../modals/launches.modal")


async function httpGetAllLaunches(req,res) {
    return res.status(200).json(await getAllLaunches())
}

 async function httpAddNewlaunch(req,res){
    const launch = req.body
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error:"missing launch fields"
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    // const hasProvidedDate = launch.launchDate.toString() === "Inavlid Date"

    //isNaN -> return true if passed a string, and return false if passed a number
    const hasNotProvidedDate = isNaN(launch.launchDate)
    if(hasNotProvidedDate) return res.status(400).json({
        error:"invalid date format"
    })
    await scheduleNewLaunch(launch)
   return res.status(201).json(launch)
}

async function httpAbortLaunch(req,res) {
   const flightNumber = Number(req.params.flightNumber)
   if(!await existLaunchWithId(flightNumber)) return res.status(404).json({
    error:"launch does not exist"
   })
   const aborted = await abortLaunchWithId(flightNumber)
   return res.status(200).json(aborted)
}

module.exports = {httpGetAllLaunches,httpAddNewlaunch,httpAbortLaunch}