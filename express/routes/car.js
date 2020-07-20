const mongoose = require('mongoose');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const Car = require('../models/car');

router.get('', async (req, res) => {
  const model = await Car.find();
  res.send(model);
});

router.get('/:id', async (req, res) => {
  let result = await Car.findById(req.params.id);

  if (!result) {
    res.status(404)
      .send('No car found with the given id');
  } else {
    res.send(result);
  }
});

router.get('/company/:company', async (req, res) => {
  let result = await Car.find({company: req.params.company});

  if (!result || result.length == 0) {
    res.status(404)
      .send('No cars found with the given company name...');
  } else {
    res.send(result);
  }
});

router.get('/company/:company/model/:model', async (req, res) => {
  let result = await Car.find({
    $and: [
      {company: req.params.company},
      {model: req.params.model}
    ]
  });

  if (!result || result.length == 0) {
    res.status(404)
      .send('No cars found with the given company name and model...');
  } else {
    res.send(result);
  }
});

router.post('/', [
  check('company').isLength({ min: 3 }),
  check('model').isLength({ min: 3 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = new Car({
      company: req.body.company,
      model: req.body.model,
      year: req.body.year,
      sold: req.body.sold,
      price: req.body.price,
      extras: req.body.extras
    });

    const result = await model.save();

    res.status(201).send(result);
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