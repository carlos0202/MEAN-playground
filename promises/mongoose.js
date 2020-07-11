const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/cars',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Connected successfully to MongoDB'))
  .catch(() => console.log('Error connecting to MongoDB'));

const carSchema = new mongoose.Schema({
  company: String,
  model: String,
  price: Number,
  year: Number,
  sold: Boolean,
  extras: [String],
  date: { type: Date, default: Date.now }
});

const Car = mongoose.model('car', carSchema);

async function createCar() {
  const car = new Car({
    company: 'Audi',
    model: 'A4',
    price: 150127,
    year: 2014,
    sold: false,
    extras: ['Automatic', '4*4']
  });

  const result = await car.save();
  console.log(`Operation result => ${result}`);
}

async function getCars() {
  const cars = await Car.find({});
  console.log(cars);
}

async function getCarsByCompanyAndSoldFilter(
  company,
  sold
) {
  const cars = await Car.find({ company: company, sold: sold });
  console.log(cars);
}

async function getCarsWithMoreFilters() {
  const cars = await Car
    .find({ company: 'BMW', sold: false })
    .sort({ price: -1 })
    .limit(2)
    .select({company: 1, model: 1, price: 1});

  console.log(cars);
}

updateCar("5ef7ebc7880e24395892478a");

async function updateCar(id) {
  const model = await Car.findById(id);

  if(!model) return;

  model.company = "ACME";
  model.model = "Road Traveler";

  const result = await model.save();
  console.log(result);
}