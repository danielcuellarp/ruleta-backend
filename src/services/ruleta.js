const Apuesta = require('../models/apuesta')
const User = require('../models/user')

// Funcion: Que realiza la apuesta 
// Entrada: color de la apuesta, dinero apostado
// Salida: resultado de apuesta y ganancia
async function apuesta(color, dinero, id){
  let num = Math.random() * (100 - 1) + 1
  let opciones = [
    {
      color: 'verde',
      probabilidad: 1,
      ganancia: 10
    },
    {
      color: 'rojo',
      probabilidad: 49.5,
      ganancia: 2
    },
    {
      color: 'negro',
      probabilidad: 49.5,
      ganancia: 2
    }     
  ]
  let max = 0 // numero limite con el que se acierta la apuesta con base a la probabilidad
  let res = { // resultado apuesta por defecto
    resultado: false,
    ganancia: (dinero * -1), // el por defecto es restar lo que se perdio
    newDinero: 0
  }

  for(i in opciones){
    max = max + opciones[i].probabilidad

    if (opciones[i].color === color && num <= max){
      // numero aleatorio coincide con la probabilidad del color 
      // se gana la apuesta
      res.resultado = true
      res.ganancia = dinero * opciones[i].ganancia
      break;
    }
  }

  res.newDinero = await actualizarGanacia(id, res.ganancia)
  guardarApuesta(id, dinero, res.resultado, res.ganancia)
  return res
}

// Funcion: actualiza el dinero del usuario que hizo la apuesta
async function actualizarGanacia(id, ganancia){  
  const userDinero = await User.findById(id)
  const newDinero = userDinero.money + ganancia
  const user = await User.findByIdAndUpdate(    
    id, 
    {$set:{money: newDinero}},
    {upsert: true}
  )
  return newDinero
}

// Funcion: guarda la bitacora de la apuesta realizada
async function guardarApuesta(id, dinero, resultado, ganancia){
  const newApuesta = new Apuesta()
  newApuesta.id = id
  newApuesta.dinero = dinero
  newApuesta.resultado = resultado
  newApuesta.ganancia = ganancia
  await newApuesta.save()
}

module.exports = {apuesta}