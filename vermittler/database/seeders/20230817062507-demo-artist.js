'use strict';

const artist = require('../models/artist');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here
    */
    const artists_array = [
      {
        name: 'SPB',
      },
      {
        name: 'DSP',
      }
    ]
    //temporarily add the slug to the artists - beforeCreate, beforeBulkCreate hooks should take care of this
    artists_array.forEach(async (artist) => {
      artist.slug = artist.name.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      artist.createdAt = new Date()
      artist.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Artists', artists_array, {});
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
