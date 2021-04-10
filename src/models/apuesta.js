const mongoose = require('mongoose');
const { Schema } = mongoose

// Definicion 
const apuestaSchema = new Schema({
  id: String,
  dinero: Number,
  resultado: Boolean,
  ganancia: Number
})

module.exports = mongoose.model('apuesta', apuestaSchema);