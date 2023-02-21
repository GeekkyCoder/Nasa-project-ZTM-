const map = new Map()

const launches = [{
  flightNumber:1,
  mission:"Kepler Exploration X",
  rocket:"Explorer IS1",
  launchDate: new Date("27 december 2030"),
  destination:"Kepler-442 b",
  customers:[
    "Faraz",
    "ZTM"
  ],
  success:true,
  upcoming:true,
  target:""
},
{
flightNumber:2,
mission:"Kepler Exploration X",
rocket:"Explorer IS1",
launchDate: new Date("27 december 2030"),
destination:"Kepler-442 b",
customers:[
  "Nasa",
  "Tesla"
],
success:true,
upcoming:true,
target:""
}]

// map.set(launches.flightNumber,launches)

module.exports = launches