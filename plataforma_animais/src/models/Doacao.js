const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Doacao = sequelize.define("Doacao", {
  item: { type: DataTypes.STRING, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  doador: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Doacao;
