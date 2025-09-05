const express = require("express");
const cors = require("cors");
const sequelize = require("./models/index");
const Denuncia = require("./models/denunciaModel.js");
const Doacao = require("./models/doacaoModel.js");

const denunciaRoutes = require("./routes/denunciaRoutes");
const doacaoRoutes = require("./routes/doacaoRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/views"));

app.use("/denuncias", denunciaRoutes);
app.use("/doacoes", doacaoRoutes);

const funcionarios = [
  { id: "admin", senha: "1234" }
];

app.post("/login", (req, res) => {
  const { id, senha } = req.body;
  const user = funcionarios.find(f => f.id === id && f.senha === senha);
  if (user) res.json({ sucesso: true });
  else res.status(401).json({ sucesso: false, mensagem: "ID ou senha incorretos" });
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
