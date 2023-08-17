'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here
    */
    await queryInterface.bulkInsert('Artists', [{
      name: 'SPB',
      email: 'spb@singer.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'DSP',
      email: 'dsp@singer.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
