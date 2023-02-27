const axios = require("axios");

const launchesDB = require("./launches.mongoos");
const planetsDB = require("./planets.mongoos");

const DEFAULT_FLIGHT_NUM = 100;

const launch = {
  flightNumber: 1,                          //flightNumber
  mission: "Kepler Exploration X",          //name
  rocket: "Explorer IS1",                   //rocket.name 
  launchDate: new Date("27 december 2030"),  // date_local
  customers: ["Faraz", "ZTM"],  //payload.customers for each payload
  success: true,    // success  
  upcoming: true,   // upcoming
  target: "Kepler-442 b", // not applicable
};

saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadLaunchData() {
  console.log("downloading launch data...");
  const response  = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path:"payloads",
          select:{
            customers:1
          }
        }
      ],
    },
  });
}

async function getAllLaunches() {
  return await launchesDB.find({});
}

async function existLaunchWithId(flightNumber) {
  const launchItem = await launchesDB.findOne({
    flightNumber: flightNumber,
  });

  return launchItem.flightNumber;
}

// function abortLaunchWithId(flightNumber) {
//   const aborted = launches.get(flightNumber);
//   aborted.success = false;
//   aborted.upcoming = false;
//   return aborted;
// }

async function abortLaunchWithId(flightNumber) {
  const abortedLaunch = await launchesDB.updateOne(
    {
      flightNumber: flightNumber,
    },
    {
      sucess: false,
      upcoming: false,
    }
  );

  return abortedLaunch.modifiedCount === 1;
}

async function saveLaunch(launch) {
  // findOne function returns true only if the value matches the key of the object!
  /*
   is used to retrieve a single document from a collection that matches a specified query criteria. Here's how it works:
   */
  const planet = await planetsDB.findOne({
    keplerName: launch.target,
  });

  // bug to fix
  if (!planet) {
    // throw new Error("no matching planet found!")
  }

  // findOneAndUpdate only returns that 2nd argument which is update object! ignoring the setOnInsert property!
  await launchesDB.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

// async function addNewLaunch(launch) {
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       success: true,
//       upcoming: true,
//       target: "kepler-1295",
//       customers: ["Zero to Mastery", "NASA"],
//       flightNumber: latestFlightNumber,
//     })
//   );
//   latestFlightNumber++;
// }

async function scheduleNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    target: "kepler-1295",
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: latestFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUM;
  }

  return latestLaunch.flightNumber;
}

module.exports = {
  loadLaunchData,
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  existLaunchWithId,
  // abortLaunchWithId,
  abortLaunchWithId,
};
