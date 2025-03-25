import React, { useState } from "react";
import axios from "axios";

const HabitCard = ({ habit, userId }) => {
  const [streak, setStreak] = useState(habit.streak);

  const markAsDone = async () => {
    try {
      const res = await axios.post(`/api/habits/${userId}/habits/${habit._id}/done`);
      setStreak(res.data.habit.streak);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="habit-card">
      <h3>{habit.name}</h3>
      <p>Racha: {streak} días</p>
      <progress value={streak} max="30"></progress>
      <button onClick={markAsDone}>Done</button>
    </div>
  );
};

export default HabitCard;
