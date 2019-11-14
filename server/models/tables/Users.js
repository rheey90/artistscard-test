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
      username: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
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
            foreignKey: "username",
            onDelete: "CASCADE"
          });
        }
      }
    }
  );
};
