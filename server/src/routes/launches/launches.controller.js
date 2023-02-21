const launches = require("../../modals/launches.modal")

function getAllLaunches(req,res) {
    return res.status(200).json(launches)
}

module.exports = getAllLaunches