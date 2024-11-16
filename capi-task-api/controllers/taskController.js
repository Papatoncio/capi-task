const pool = require("../db/db"); // Configuración de la conexión a PostgreSQL

// Crear una tarea
const createTask = async (req, res) => {
  const { titulo, descripcion, prioridad, categoria, fecha_limite } = req.body;
  const usuario_id = req.user.id; // ID del usuario autenticado

  try {
    const result = await pool.query(
      `INSERT INTO tareas (usuario_id, titulo, descripcion, prioridad, categoria, fecha_limite) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [usuario_id, titulo, descripcion, prioridad, categoria, fecha_limite]
    );

    res
      .status(201)
      .json({ message: "Tarea creada con éxito", task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

// Obtener las tareas de un usuario
const getTasks = async (req, res) => {
  const usuario_id = req.user.id; // ID del usuario autenticado

  try {
    const result = await pool.query(
      `SELECT * FROM tareas WHERE usuario_id = $1 ORDER BY created_at DESC`,
      [usuario_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, prioridad, categoria, estado, fecha_limite } =
    req.body;
  const usuario_id = req.user.id; // ID del usuario autenticado

  try {
    const result = await pool.query(
      `UPDATE tareas 
       SET titulo = $1, descripcion = $2, prioridad = $3, categoria = $4, estado = $5, fecha_limite = $6 
       WHERE id = $7 AND usuario_id = $8 
       RETURNING *`,
      [
        titulo,
        descripcion,
        prioridad,
        categoria,
        estado,
        fecha_limite,
        id,
        usuario_id,
      ]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada" });
    }

    res
      .status(200)
      .json({ message: "Tarea actualizada con éxito", task: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id; // ID del usuario autenticado

  try {
    const result = await pool.query(
      `DELETE FROM tareas WHERE id = $1 AND usuario_id = $2`,
      [id, usuario_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada" });
    }

    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id; // ID del usuario autenticado

  try {
    const result = await pool.query(
      `SELECT * FROM tareas WHERE id = $1 AND usuario_id = $2`,
      [id, usuario_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
};
