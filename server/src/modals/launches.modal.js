const launches = new Map();

let latestFlightNumber = 1;

const launch = {
  flightNumber: 1,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("27 december 2030"),
  destination: "Kepler-442 b",
  customers: ["Faraz", "ZTM"],
  success: true,
  upcoming: true,
  target: "",
};

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

module.exports = { getAllLaunches, addNewLaunch };
