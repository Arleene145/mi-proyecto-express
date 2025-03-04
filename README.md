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