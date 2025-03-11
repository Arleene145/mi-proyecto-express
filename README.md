# Proyecto Express con MongoDB Atlas

## 📌 Requisitos:
- Node.js instalado
- Cuenta en MongoDB Atlas

## 🚀 Instalación:
1. Clonar el repositorio:
2. Instalar dependencias:
3. Configurar variables de entorno:
- Crear un archivo `.env`
- Agregar:
  ```
  PORT=5000
  MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre_base_de_datos>?retryWrites=true&w=majority
  ```
4. Ejecutar el servidor:
## 📡 Endpoints:
- `POST /habitos` → Crear un hábito  
- `GET /habitos` → Obtener todos los hábitos  
- `PUT /habitos/:id` → Actualizar un hábito  
- `DELETE /habitos/:id` → Eliminar un hábito  

---
🚀 **¡Listo! Ahora tienes una API en Express conectada a MongoDB Atlas.** 🎉


# Estructura del Proyecto

Este proyecto está organizado en dos carpetas principales:

- `frontend/` - Contiene el código del cliente en Next.js con TailwindCSS y Redux.
- `backend/` - Contendrá la API para gestionar los hábitos.

## Configuración Inicial

### 1. Clonar el Repositorio
```sh
git clone https://github.com/tu-repositorio.git
cd tu-repositorio
```

### 2. Configurar el Backend
```sh
cd backend
npm install
npm start
```

Asegúrate de tener un servidor backend ejecutando en `http://localhost:4000` que responda con la lista de hábitos.

### 3. Configurar el Frontend
```sh
cd ../frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000/`.

---

# Código del Frontend (Next.js + Redux)

## Instalación y Configuración
1. **Crear proyecto Next.js**
```sh
npx create-next-app@latest frontend
cd frontend
```

2. **Instalar TailwindCSS**
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Configurar `tailwind.config.js`:
```js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```
En `styles/globals.css`, añadir:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Instalar Redux Toolkit**
```sh
npm install @reduxjs/toolkit react-redux axios
```

4. **Configurar Redux**
Crear `redux/store.js`:
```js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener hábitos del backend
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const response = await axios.get("http://localhost:4000/habits");
  return response.data;
});

const habitsSlice = createSlice({
  name: "habits",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchHabits.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const store = configureStore({
  reducer: { habits: habitsSlice.reducer },
});
```

En `_app.js`:
```js
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
```

5. **Actualizar el componente de hábitos**
```js
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
