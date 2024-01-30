let jwt=require("jsonwebtoken");

const auth = (role) => async (req, res, next) => {
  try {
    const token =JSON.parse(req.header("Authorization"));
    if (!token) {
      return res.status(400).json({mensaje:"Token incorrecto"})
    }
    const verify = jwt.verify(token, process.env.SECRET_KEY)

    if (verify && verify.Role === role) {
      req.idUsuario=verify.idUsuario,
      req.idCarr=verify.idCarr,
      req.idFav=verify.idFav,
      next();
    } else {
      res.status(401).json({ mensaje: "No estás autorizado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
}
  
module.exports = auth;

