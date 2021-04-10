const { Router } = require('express');
const router = new Router();
const User = require('../models/user');

// Ver Usuarios
router.get('/', async (req, res) => {
  const users = await User.find().sort('-_name')
  res.json(users);    
});

// Guardar Usuario
router.post('/', async (req, res) => {
  const { email, password, name, money } = req.body;    
  const newUser = new User()
  newUser.email = email
  newUser.password = newUser.encryptPassword(password)
  newUser.name = name.toUpperCase()
  newUser.money = 15000
  await newUser.save()
  res.json(newUser);
});

// Editar Usuario
router.put('/:id', async (req, res) => {
  const { email, password, name, money } = req.body;    
  const newUser = new User()
  const user = await User.findByIdAndUpdate(    
    req.params.id, // filtro
    {      
      $set: { // datos a actualizar    
        email: email,
        name: name.toUpperCase(),
        password: newUser.encryptPassword(password),
        money: money
      }
    },
    {
      upsert: true
    }
    );
    const userUpdated = await User.findById(req.params.id);
    res.json(userUpdated); 
});

// Eliminar Usuario
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  const users = await User.find().sort('-_name');
  res.json(users);  
});

// Ver Un Usuario
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);  
});

// Login Usuario
router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  let errorMsg = "";
  let id = "";

  // busco el usuario y defino el error si lo hay
  const user = await User.findOne({email: email}); 
  if(!user) {
    errorMsg = "Usuario no existe";
  } else if(!user.comparePassword(password)) {
    errorMsg = "Contraseña incorrecta";
  } else {
    errorMsg = "";
    id = user.id;
  }

  // respuesta
  res.json({
    "usuario": id, 
    "error": errorMsg
  });
});

module.exports = router;