const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Denuncia = sequelize.define("Denuncia", {
  tipo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  urgencia: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Denuncia;
