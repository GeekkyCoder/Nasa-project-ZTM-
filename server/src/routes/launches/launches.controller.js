const {getAllLaunches,addNewLaunch} = require("../../modals/launches.modal")


function httpGetAllLaunches(req,res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewlaunch(req,res){
    const launch = req.body
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination){
        return res.status(400).json({
            error:"missing launch fields"
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    // const hasProvidedDate = launch.launchDate.toString() === "Inavlid Date"
    const hasNotProvidedDate = isNaN(launch.launchDate)
    if(hasNotProvidedDate) return res.status(400).json({
        error:"invalide date format"
    })
    addNewLaunch(launch)
   return res.status(201).json(launch)
}

module.exports = {httpGetAllLaunches,httpAddNewlaunch}