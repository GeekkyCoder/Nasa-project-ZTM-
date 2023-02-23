const launches = new Map();

let latestFlightNumber = 1;

const launch = {
  flightNumber: 1,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("27 december 2030"),
  customers: ["Faraz", "ZTM"],
  success: true,
  upcoming: true,
  target: "Kepler-442 b",
};

function getAllLaunches() {
  return Array.from(launches.values());
}

function existLaunchWithId(flightNumber) {
   return launches.has(flightNumber)
}

function abortLaunchWithId(flightNumber){
   const aborted = launches.get(flightNumber)
   aborted.success = false 
   aborted.upcoming = false
   return aborted
}

function addNewLaunch(launch) {
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      target:"kepler-1295",
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
    );
    latestFlightNumber++;
}

module.exports = { getAllLaunches, addNewLaunch,existLaunchWithId,abortLaunchWithId };
