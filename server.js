const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const { getUser } = require("./consultas");
//Configuracion
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/components",
  })
);
secretKey = "Prueba";
app.listen(3000, console.log("Servidor en puerto 3000"));

//Middleware
app.use("/bootstrap", express.static(__dirname + "/assets/css"));

//Rutas
app.get("/Login", (req, res) => {
  res.render("Login", { layout: "Login" });
});

app.post("/Home", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser(email, password);
  let token = user ? jwt.sign(user, secretKey) : false;
  user
    ? res.send(token)
    : res.send("No existe este usuario en nuestra base de datos");
});

app.get("/Home", (req, res) => {
  const { token } = req.query;
  jwt.verify(token, "Prueba", (err, data) => {
    if (!err) {
      console.log(data);
      res.render("Home", { layout: "Home" });
    } else {
      res.status(401).send("No esta autorizado");
    }
  });
});
