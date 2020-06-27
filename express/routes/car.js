const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

var cars = [
  { id: 0, company: "BMW", model: "X3", year: "2020" },
  { id: 3, company: "BMW", model: "X3", year: "2017" },
  { id: 1, company: "Audi", model: "A4", year: "2019" },
  { id: 2, company: "Ford", model: "R1", year: "2010" }
];

router.get('', (req, res) => {
  res.send(cars);
});

router.get('/:id', (req, res) => {
  let result = cars.find(
    car => car.id === parseInt(req.params.id)
  );

  if (!result) {
    res.status(404)
      .send('No car found with the given id');
  } else {
    res.send(result);
  }
});

router.get('/company/:company', (req, res) => {
  let result = cars.filter(
    car => car.company === req.params.company
  );
  if (!result || result.length == 0) {
    res.status(404)
      .send('No cars found with the given company name...');
  } else {
    res.send(result);
  }
});

router.get('/company/:company/model/:model', (req, res) => {
  let result = cars.filter(
    car => car.company === req.params.company
      && car.model === req.params.model
  );
  if (!result || result.length == 0) {
    res.status(404)
      .send('No cars found with the given company name and model...');
  } else {
    res.send(result);
  }
});

router.post('', [
  check('company').isLength({ min: 3 }),
  check('model').isLength({ min: 3 })
],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var carId = cars.length;
    let payload = req.body;
    let model = {
      id: carId,
      ...payload
    };
    cars.push(model);

    res.status(201).send(model);
  });

router.put('/:id', [
  check('company').isLength({ min: 3 }),
  check('model').isLength({ min: 3 })
],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = cars.find(c => c.id === parseInt(req.params.id));

    if (!model) {
      return res.status(404)
        .send(`No car found with the given id: ${req.params.id}`);
    }

    model.company = req.body.company;
    model.model = req.body.model;
    model.year = parseInt(req.body.year);

    res.status(204).send();
  });

router.delete('/:id', (req, res) => {
  const model = cars.find(c => c.id === parseInt(req.params.id));

  if (!model) {
    return res.status(404)
      .send(`No car found with the given id: ${req.params.id}`);
  }

  const index = cars.indexOf(model);
  cars.splice(index, 1);

  res.send('Car successfully deleted...');
});

module.exports = router;