'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const songs_array = [
      {
        title: 'Song 1',
        // album_slug: 'telugu-2000-album-1',
        album_id: 1,
        summary: {
          foreign: ["This is the summary of song 1"],
          native: ["This is the native summary of song 1"],
        },

        lyrics: {
          foreign: ["This is the lyrics of song 1"],
          native: ["This is the native lyrics of song 1"],
        },
      },
      {
        title: 'Song 2',
        // album_slug: 'tamil-2001-album-2',
        album_id: 2,
        summary: {
          foreign: ["This is the summary of song 2"],
          native: ["This is the native summary of song 2"],
        },
        lyrics: {
          foreign: ["This is the lyrics of song 2"],
          native: ["This is the native lyrics of song 2"],
        },
      },
      {
        title: 'Song 3',
        // album_slug: 'tamil-2001-album-2',
        album_id: 2,
        summary: {
          foreign: ["This is the summary of song 3"],
          native: ["This is the native summary of song 3"],
        },
        lyrics: {
          foreign: ["This is the lyrics of song 3"],
          native: ["This is the native lyrics of song 3"],
        },
      }

    ]
    //temporarily add the slug to the songs - beforeCreate, beforeBulkCreate hooks should take care of this
    songs_array.forEach(async (song) => {
      song.slug = song.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      song.createdAt = new Date()
      song.updatedAt = new Date()
      //stringify the json objects
      song.summary = JSON.stringify(song.summary)
      song.lyrics = JSON.stringify(song.lyrics)
    })
    await queryInterface.bulkInsert('Songs', songs_array, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
