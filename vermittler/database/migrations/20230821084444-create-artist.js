'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        // create a slug using beforeCreate hook in the model
        // allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      sung_songs: {
        type: Sequelize.JSON,
        references: {
          model: 'Songs',
          key: 'slug'
        },
      },
      composed_songs: {
        type: Sequelize.JSON,
        references: {
          model: 'Songs',
          key: 'slug'
        },
      },
      written_songs: {
        type: Sequelize.JSON,
        references: {
          model: 'Songs',
          key: 'slug'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Artists');
  }
};