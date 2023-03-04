const axios = require("axios");

const launchesDB = require("./launches.mongoos");
const planetsDB = require("./planets.mongoos");

const DEFAULT_FLIGHT_NUM = 100;

const launch = {
  flightNumber: 1, //flightNumber
  mission: "Kepler Exploration X", //name
  rocket: "Explorer IS1", //rocket.name
  launchDate: new Date("27 december 2030"), // date_local
  customers: ["Faraz", "ZTM"], //payload.customers for each payload
  success: true, // success
  upcoming: true, // upcoming
  target: "Kepler-442 b", // not applicable
};

saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    mission: "FalconSat",
    rocket: "Falcon 1",
  });

  if (firstLaunch) {
    console.log(`launch already exist in the database`);
  } else {
    await populateLaunches();
  }
}

async function populateLaunches() {
  console.log("downloading launch data...");
  try{
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });
    const launchesData = response.data.docs;
    for (let launchDoc of launchesData) {
      const payloads = launchDoc["payloads"];
      const customers = payloads.flatMap((payload) => {
        return payload["customers"];
      });
  
      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
        customers,
      };
     
      // save laucnhes data in database
      await saveLaunch(launch)
    }
  }catch(err){
     console.log(`error: ${err}`)
  }
 
}

async function getAllLaunches(skip,limit) {
  return await launchesDB.find({},{'_id':0,'_v':0})
  .skip(skip)
  .limit(limit)
}

async function findLaunch(filter) {
  return await launchesDB.findOne(filter);
}

async function existLaunchWithId(flightNumber) {
  const launchItem = await findLaunch({
    flightNumber: flightNumber,
  });

  return launchItem.flightNumber;
}

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

async function scheduleNewLaunch(launch) {
  const planet = await planetsDB.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("no matching planet found!")
  }

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
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchWithId,
};
