const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Agrega los datos del usuario a req.user
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;
