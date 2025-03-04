const express = require("express");
const Habito = require("../models/Habito");
const router = express.Router();

// Crear un nuevo hábito (Alta)
router.post("/", async (req, res) => {
  try {
    const nuevoHabito = new Habito(req.body);
    await nuevoHabito.save();
    res.status(201).json(nuevoHabito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los hábitos
router.get("/", async (req, res) => {
  try {
    const habitos = await Habito.find();
    res.json(habitos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un hábito (Cambio)
router.put("/:id", async (req, res) => {
  try {
    const habitoActualizado = await Habito.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habitoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un hábito (Baja)
router.delete("/:id", async (req, res) => {
  try {
    await Habito.findByIdAndDelete(req.params.id);
    res.json({ message: "Hábito eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
