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
        allowNull: false,
        type: Sequelize.STRING
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
      album_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      // album_slug: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: 'Albums',
      //     key: 'slug'
      //   },
      //   onDelete: 'CASCADE'
      // },
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