const BASE_URL = "http://localhost:8000/v1"

// Load planets and return as JSON.
async function httpGetPlanets() {
  const resp = await fetch(`${BASE_URL}/planets`)
  return await resp.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const resp = await fetch(`${BASE_URL}/launches`)
  const data =  await resp.json()
  return data.sort((a,b)=> {
    return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  try{
     return await fetch(`${BASE_URL}/launches`, {
      method:"post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    })
  }catch(err){
     return {
      ok: false
     }
  }

}

// TODO: Once API is ready.
async function httpAbortLaunch(id) {
  try{
   return await fetch(`${BASE_URL}/launches/${id}`, {
      method:"delete"
    })
  }catch(err){
    console.log(err)
    throw new Error(err)
  }

  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};