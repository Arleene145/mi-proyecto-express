const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Marcar hábito como hecho
router.post("/:userId/habits/:habitId/done", async (req, res) => {
  try {
    const { userId, habitId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const habit = user.habits.id(habitId);
    if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

    const today = new Date();
    const lastCompleted = new Date(habit.lastCompleted);

    const difference = Math.floor((today - lastCompleted) / (1000 * 60 * 60 * 24));

    if (difference === 1) {
      habit.streak += 1; // Aumenta la racha si es consecutivo
    } else if (difference > 1) {
      habit.streak = 1; // Reinicia si se perdió la racha
    }

    habit.lastCompleted = today;
    await user.save();

    res.json({ message: "Hábito actualizado", habit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
