const mongoose = require("mongoose");
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const User = require("../models/user");

router.get('/', async (req, res) => {
  const model = await User
    .find()
    .select({ password: 0 });
  res.status(200).send(model);
});

router.get('/:id', async (req, res) => {
  const model = await User.findById(req.params.id);

  if (!model) {
    res.status(404)
      .send(`No user found with the given id: ${req.params.id}`);
  } else {
    res.status(201)
      .send(model);
  }
});

router.post('/',
  [
    check("email").isEmail().isLowercase(),
    check("password").isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isCustomer: req.body.isCustomer
    });

    const result = await model.save();

    res.status(201).send(result);
  });

router.put('/:id',
  [
    check("email").isEmail().isLowercase()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const model = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      isCustomer: req.body.isCustomer
    },
      { new: true }
    );

    if (!model) {
      return res.status(404)
        .send(`The user with the id ${req.params.id} was not found...`);
    }

    res.status(204).send();

  });

router.delete('/:id', async (req, res) => {
  const model = await User.findByIdAndDelete(req.params.id);

  if (!model) {
    return res.status(404)
      .send(`No user found with the given id: ${req.params.id}`);
  }

  res.send('User successfully deleted...');
})

module.exports = router;