const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres:/birrapp", //Conexion con la base de datos sin contraseña ni usario.
  {
    logging: false,
    dialect: "postgres",
  }
);

module.exports = sequelize;
