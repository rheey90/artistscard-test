const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define(
    "music",
    {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      artist: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      album: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      userid: {
        type: Sequelize.INTEGER(11)
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Music.belongsTo(models.User, {
            foreignKey: "id",
            onDelete: "CASCADE"
          });
        }
      }
    }
  );
};
