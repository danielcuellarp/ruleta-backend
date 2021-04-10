const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const ruleta = require('../services/ruleta');

// Crear Apuesta
router.get('/', async (req, res) => {
  const { color, dinero, id } = req.body;
  const resApuesta = await ruleta.apuesta(color, dinero, id);
  res.json(resApuesta);
});

module.exports = router;
