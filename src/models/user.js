const mongoose = require('mongoose');
const bcyrpt = require('bcrypt-nodejs');
const { Schema } = mongoose

// Definicion 
const userSchema = new Schema({
  email: String,
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

module.exports = mongoose.model('users', userSchema);