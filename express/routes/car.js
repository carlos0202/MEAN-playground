const mongoose = require('mongoose');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const Car = require('../models/car');

router.get('', async (req, res) => {
  const model = await Car
    .find()
    .populate('company', 'name country');
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
  let result = await Car.find({ company: req.params.company });

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
      { company: req.params.company },
      { model: req.params.model }
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
  check('model').isLength({ min: 3 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = await Car.findByIdAndUpdate(req.params.id, {
      company: req.body.company,
      model: req.body.model,
      year: req.body.year,
      sold: req.body.sold,
      price: req.body.price,
      extras: req.body.extras
    }, { new: true });

    if (!model) {
      return res.status(404)
        .send(`No car found with the given id: ${req.params.id}`);
    }

    res.status(204).send();
  });

router.delete('/:id', async (req, res) => {
  const model = await Car.findByIdAndDelete(req.params.id);

  if (!model) {
    return res.status(404)
      .send(`No car found with the given id: ${req.params.id}`);
  }

  res.send('Car successfully deleted...');
});

module.exports = router;