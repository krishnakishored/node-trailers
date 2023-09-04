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
        album_name: 'Album 1',
        year: 2000,
        language: 'Telugu',
        summary: {
          foreign: ["This is the summary of song 1"],
          native: ["This is the native summary of song 1"],
        },
        lyrics: {
          foreign: ["This is the lyrics of song 1"],
          native: ["This is the native lyrics of song 1"],
        },
        // singers: ['singer 1', 'singer 2'],
        // lyricists: ['lyricist 1', 'lyricist 2'],
        // music_directors: ['music director 1', 'music director 2'],
      },
      {
        title: 'Song 2',
        // album_slug: 'tamil-2001-album-2',
        year: 2001,
        language: 'Tamil',
        album_name: 'Album 2',
        summary: {
          foreign: ["This is the summary of song 2"],
          native: ["This is the native summary of song 2"],
        },
        lyrics: {
          foreign: ["This is the lyrics of song 2"],
          native: ["This is the native lyrics of song 2"],
        },
        // singers: ['singer 1'],
        // lyricists: ['lyricist 2'],
        // music_directors: ['music director 2'],
      },
      {
        title: 'Song 3',
        language: 'Hindi',
        year: 2002,
        album_name: 'Album 3',
        summary: {
          foreign: ["This is the summary of song 3"],
          native: ["This is the native summary of song 3"],
        },
        lyrics: {
          foreign: ["This is the lyrics of song 3"],
          native: ["This is the native lyrics of song 3"],
        },
        // singers: ['singer 2'],
        // lyricists: ['lyricist 1'],
        // music_directors: ['music director 2'],
      }

    ]
    //temporarily add the slug to the songs - beforeCreate, beforeBulkCreate hooks should take care of this
    songs_array.forEach(async (song) => {
      let album_slug_combo = song.album_name + " " + song.year + " " + song.language
      song.album_slug = album_slug_combo.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      let song_title_slug = song.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      song.slug = song.album_slug + "-" + song_title_slug
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
