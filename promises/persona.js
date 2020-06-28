const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/banco',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Connected successfully to MongoDB'))
  .catch(() => console.log('Error connecting to MongoDB'));

const nameSchema = new mongoose.Schema({
  first: String,
  last: String
});

const personaSchema = new mongoose.Schema({
  index: Number,
  guid: String,
  isActive: Boolean,
  balance: String,
  picture: String,
  age: Number,
  eyeColor: String,
  name: {type: nameSchema, default: {}},
  company: String,
  email: String,
  phone: String,
  address: String,
  about: String,
  registered: String,
  latitude: String,
  longitude: String,
  tags: [String],
  range: [Number],
  friends: [String],
  greeting: String,
  favoriteFruit: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Persona = mongoose.model('persona', personaSchema, 'persona');

getPersonas();

async function getPersonas() {
  let result = await Persona
    .find({index: {$gt: 5, $lt: 10}})
    .limit(5);

  console.log(result);
}