const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userid: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Users.hasMany(models.Music, {
            foreignKey: "userid",
            onDelete: "CASCADE"
          });
        }
      }
    }
  );
};
