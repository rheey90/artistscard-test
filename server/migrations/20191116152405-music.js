"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("music", {
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
      filelocation: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      userid: {
        type: Sequelize.STRING(35),
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "userid"
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("music");
  }
};
