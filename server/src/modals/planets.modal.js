const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

// const habitablePlanets = [];

const planets = require("./planets.mongoos");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data);
          // peroform following operation here:
          // insert + update = upsert
          try {
            await savePlanet(data);
          } catch (err) {
            console.log(`filed to insert or update ${err}`);
          }
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject();
      })
      .on("end", async () => {
        const planetDocsLen =  (await getPlanets()).length
        console.log(`${planetDocsLen} habitable planets found!`);
        resolve();
      });
  });
}

async function getPlanets() {
  return await planets.find({});
}

async function savePlanet(planet) {
  await planets.updateOne(
    {
      keplerName: planet.kepler_name,
    },
    {
      keplerName: planet.kepler_name,
    },
    {
      upsert: true,
    }
  );
}

module.exports = {
  getPlanets,
  loadPlanetsData,
};
