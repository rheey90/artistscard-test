const Sequelize = require("sequelize");

module.exports = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  classMethods: {
    associate: models => {
      User.hasMany(models.Music, {
        foreignKey: "id",
        onDelete: "CASCADE"
      });
    }
  }
});
