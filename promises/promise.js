function getCar(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Obtained car with id x...');
      resolve({ id: 23, model: 'X3', company: 'BMW' })
    }, 2000);
  });
}

function getModel(model) {
  return new Promise((resolve, reject) => {
    console.log('Obtained X3 model from BMW...');
    resolve({ speed: 200, seat: 5, size: '4*5' });
  }, 2000);
}

async function showModel() {
  try {
    const car = await getCar(23);
    const model = await getModel(car.model);
    console.log(model);
  } catch (err) {
    console.log(err.message);
  }
}

showModel();