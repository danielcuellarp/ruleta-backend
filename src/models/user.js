const mongoose = require('mongoose');
const bcyrpt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose

// Definicion 
const userSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  name: String,
  money: Number
})

// Cifrar la contraseña 
userSchema.methods.encryptPassword = (password) => {
  return bcyrpt.hashSync(password, bcyrpt.genSaltSync(10))
}

// Compara si la contraseña es correcta (compara el dato cifrado, no se necesita descifrar)
// se declara como function normal, si se usa => da error de UnhandledPromiseRejectionWarning
userSchema.methods.comparePassword = function (password) {
  return bcyrpt.compareSync(password, this.password);
}

userSchema.plugin(uniqueValidator, {
  code: 409,
  message: 'Ya existe un usuario con este correo.'
});

module.exports = mongoose.model('users', userSchema);