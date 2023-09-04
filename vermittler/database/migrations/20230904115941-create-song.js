'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false, // this is new
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING,
        defaultValue: "Music"
      },
      year: {
        type: Sequelize.INTEGER,
        defaultValue: 1913
      },
      album_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      slug: {
        unique: true,
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.JSON
      },
      lyrics: {
        type: Sequelize.JSON
      },
      // references:
      album_slug: {
        type: Sequelize.STRING,
        references: {
          model: 'Albums',
          key: 'slug'
        },
        // onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};