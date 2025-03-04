const mongoose = require("mongoose");

const habitoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  frecuencia: { type: String, enum: ["Diario", "Semanal", "Mensual"], required: true },
  completado: { type: Boolean, default: false },
});

const Habito = mongoose.model("Habito", habitoSchema);

module.exports = Habito;