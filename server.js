require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error de conexión:", err));

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
const habitosRoutes = require("./routes/habitos");
app.use("/habitos", habitosRoutes);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Conectado"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const habitRoutes = require("./routes/habitRoutes");
app.use("/api/habits", habitRoutes);
