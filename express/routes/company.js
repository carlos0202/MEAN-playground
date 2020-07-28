const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Company = require("../models/company");

router.get('/', async (req, res) => {
  const model = await Company
    .find()
    .select({ password: 0 });
  res.status(200).send(model);
});

router.get('/:id', async (req, res) => {
  const model = await Company.findById(req.params.id);

  if (!model) {
    res.status(404)
      .send(`No company found with the given id: ${req.params.id}`);
  } else {
    res.status(201)
      .send(model);
  }
});

router.post('/',
  [
    check("name").isLength({ min: 2, max: 50 }),
    check("country").isLength({ min: 2, max: 50 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = new Company({
      name: req.body.name,
      country: req.body.country
    });

    const result = await model.save();

    res.status(201).send(result);
  });

router.put('/:id',
  [
    check("name").isLength({ min: 2, max: 50 }),
    check("country").isLength({ min: 2, max: 50 })
  ],
  async (req, res) => {
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = await Company.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.company
    },
      { new: true }
    );

    if (!model) {
      return res.status(404)
        .send(`The company with the id ${req.params.id} was not found...`);
    }

    res.status(204).send();

  });

router.delete('/:id', async (req, res) => {
  const model = await Company.findByIdAndDelete(req.params.id);

  if (!model) {
    return res.status(404)
      .send(`No company found with the given id: ${req.params.id}`);
  }

  res.send('Company successfully deleted...');
})

module.exports = router;