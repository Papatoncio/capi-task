const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");

// Registro de usuario
const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, hashedPassword]
    );
    res.json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario", msg: error });
  }
};

// Inicio de sesi�n
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesi�n" });
  }
};

module.exports = { register, login };
