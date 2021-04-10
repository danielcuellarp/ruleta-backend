const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const ruleta = require('../services/ruleta');

// Crear Apuesta
router.post('/', async (req, res) => {
  console.log(req.body)
  const { color, money, usuario } = req.body;
  const resApuesta = await ruleta.apuesta(color, money, usuario);
  res.json(resApuesta);
});

module.exports = router;
