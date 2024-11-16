const express = require("express");
const {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasks,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Crear tarea
router.post("/", authMiddleware, createTask);

// Obtener tareas por usuario
router.get("/", authMiddleware, getTasks);

// Obtener tarea por ID
router.get("/:id", authMiddleware, getTaskById);

// Actualizar tarea por ID
router.put("/:id", authMiddleware, updateTask);

// Eliminar tarea por ID
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
