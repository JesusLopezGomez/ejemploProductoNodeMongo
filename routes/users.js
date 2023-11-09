const express = require("express");
/*
  El enrutador es un objeto en el módulo base de Express.
  Este objeto de enrutador tendrá métodos similares (.get, .post, .patch, .delete) al
  objeto de la aplicación que hemos estado utilizando anteriormente.
*/
const router = express.Router();

const users = []; // idealmente, esto sería una base de datos, pero comenzaremos con algo simple
var id = 1; // esto nos ayudará a identificar usuarios únicos

// en lugar de app.get...
router.get("/", (req, res) => {
  return res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find(val => val.id === Number(req.params.id));
  return res.json(user);
});

// en lugar de app.post...
router.post("/", (req, res) => {
  const newUser = {
    name: req.body.name,
    id: ++id
  };
  users.push(newUser);
  return res.json(newUser);
});

// en lugar de app.patch...
router.patch("/:id", (req, res) => {
  const user = users.find(val => val.id === Number(req.params.id));
  user.name = req.body.name;
  return res.json({ message: "Actualizado" });
});

// en lugar de app.delete...
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex(val => val.id === Number(req.params.id));
  users.splice(userIndex, 1);
  return res.json({ message: "Eliminado" });
});

// Ahora que hemos construido todas estas rutas, ¡exportemos este módulo para usarlo en nuestro app.js!
module.exports = router;