const {parse } = require('csv-parse');

const fs = require('fs');

const habitablePlanets = [] ; 

// to check if planet is habitable 
const isHabitablePlanets = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED' && 
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
    && planet['koi_prad'] < 1.6 ; 
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    columns: true ,
    comment : '#' 
  }))
  .on('data', (planet) => {
    if(isHabitablePlanets(planet)){
      habitablePlanets.push(planet); 
    }
  })
  .on('error' , (err) => {
    console.log(err) ; 
  })
  .on('end', () => {
    // map function is used to return the name of planets which is habiatable 
    console.log(habitablePlanets.map((planet) => planet.kepler_name)); 
    console.log('done');
  })