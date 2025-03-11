import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHabits } from "../redux/store";

export default function HabitTracker() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.list);
  const status = useSelector((state) => state.habits.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHabits());
    }
  }, [status, dispatch]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Habit Tracker</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="bg-blue-500 h-4 rounded-full w-2/5"></div>
      </div>
      <ul>
        {habits.map((habit, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{habit}</span>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
