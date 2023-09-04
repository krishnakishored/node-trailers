'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const albums_array = [
      {
        title: 'Album 1',
        language: 'telugu',
        year: 2000
      },
      {
        title: 'Album 2',
        language: 'tamil',
        year: 2001
      },
      {
        title: 'Album 3',
        language: 'hindi',
        year: 2002
      }
    ]
    //temporarily add the slug to the albums - beforeCreate, beforeBulkCreate hooks should take care of this
    albums_array.forEach(async (album) => {
      let slug_field_combo = album.title + " " + album.year + " " + album.language

      album.slug = slug_field_combo.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      album.createdAt = new Date()
      album.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Albums', albums_array, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
