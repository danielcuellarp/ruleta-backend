const { Router } = require('express');
const router = new Router();
const User = require('../models/user');

// Ver Usuarios
router.get('/', async (req, res) => {
  const users = await User.find().sort('-_name');
  res.json(users);    
});

// Guardar Usuario
router.post('/', async (req, res) => {
  const { email, password, name, money } = req.body;    
  const newUser = new User()
  newUser.email = email
  newUser.password = newUser.encryptPassword(password)
  newUser.name = name.toUpperCase()
  await newUser.save()
  res.json(newUser);
});

// Eliminar Usuario
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  const users = await User.find().sort('-_name');
  res.json(users);  
});

module.exports = router;