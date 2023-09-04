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
      },
      {
        name: 'lyricist 1'
      },
      {
        name: 'lyricist 2'
      },
      {
        name: 'music director 1'
      },
      {
        name: 'music director 2'
      },
      {
        name: 'singer 1'
      },
      {
        name: 'singer 2'
      },
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
