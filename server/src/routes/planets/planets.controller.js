const {getPlanets} = require("../../modals/planets.modal");

async function getAllPlanets(req, res) {
  return res.status(200).json(await getPlanets());
}

module.exports = {
  getAllPlanets,
};
