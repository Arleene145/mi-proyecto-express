import { useSelector } from 'react-redux';

export default function HabitTracker() {
  const habits = useSelector((state) => state.habits.list);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Habit Tracker</h2>
      
      {/* Barra de progreso estática */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="bg-blue-500 h-4 rounded-full w-2/5"></div>
      </div>

      {/* Lista de hábitos */}
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
