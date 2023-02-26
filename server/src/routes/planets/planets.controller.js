const {planets} = require("../../modals/planets.modal");


console.log(planets)

function getAllPlanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = {
  getAllPlanets,
};
