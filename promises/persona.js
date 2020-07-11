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

const friendSchema = new mongoose.Schema({
  id: Number,
  name: String
});

const personaSchema = new mongoose.Schema({
  _id: String,
  index: Number,
  guid: String,
  isActive: Boolean,
  balance: String,
  picture: String,
  age: Number,
  eyeColor: String,
  name: { type: nameSchema, default: {} },
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
  friends: { type: [friendSchema], default: [] },
  greeting: String,
  favoriteFruit: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Persona = mongoose.model('persona', personaSchema, 'persona');

updateFirstPersona("5d50150600338d458ec4e8fb");

async function getPersonas() {
  let result = await Persona
    .find({ index: { $gt: 5, $lt: 10 } })
    .limit(5);

  console.log(result);

  await closeConnection();
}

async function getPersonasIn() {
  let result = await Persona
    .find({ tags: { $in: 'nulla' } });

  console.log(result);

  await closeConnection();
}

async function getPersonasNin() {
  let result = await Persona
    .find({ tags: { $nin: 'nulla' } });

  console.log(result);

  await closeConnection();
}

async function getPersonasAnd() {
  let result = await Persona
    .find()
    .and([{ company: "ENTOGROK" }, { eyeColor: "blue" }]);
  console.log(result, result.length);

  await closeConnection();
}

async function closeConnection() {
  await mongoose.connection.close();

  process.exit(0);
}

async function getPersonasCount() {
  let result = await Persona
    .find({ eyeColor: "blue" })
    .countDocuments();

  console.log(`Cantidad de registros en la BD: ${result}`);

  await closeConnection();
}

async function getPersonasPaginated(pageNumber, pageSize) {
  let result = await Persona
    .find({ eyeColor: "blue" })
    .skip((pageNumber -1 ) * pageSize)
    .limit(pageSize);

  console.log(result);

  await closeConnection();
}

async function updatePersona(id) {
  const model = await Persona.findOne({_id: id});
  console.log(model);
  if(!model){
    console.log(`Persona object not found with the given id: ${id}`);
  } else {
    model.isActive = true;
    model.balance = "$5,000.00";
    model.age = 30;

    const result = await model.save();
    console.log(result);
  }

  await closeConnection();
}

async function updateFirstPersona(id) {
  const result = await Persona.updateOne(
    { _id : id},
    {
      $set: {
        isActive: false,
        balance: "$2,250.00",
        age: 28
      }
    }
  );

  console.log(result);

  await closeConnection();
}