'use strict';
const { Artist } = require('../models')

/** @type {import('sequelize-cli').Migration} */




const populateSongs = async (queryInterface, songs_array) => {
  //discard the singers, lyricists, music_directors arrays
  for (let song of songs_array) {
    delete song.singers
    delete song.lyricists
    delete song.music_directors
  }
  await queryInterface.bulkInsert('Songs', songs_array, {});
}


const populateAssociationTables = async (queryInterface, songs_array) => {

  for (let song of songs_array) {
    console.log(`--------- song: ${JSON.stringify(song.title)} ----------------`)
    let album_slug_combo = song.album_name + " " + song.year + " " + song.language
    song.album_slug = album_slug_combo.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
    let song_title_slug = song.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
    song.slug = song.album_slug + "-" + song_title_slug
    song.createdAt = new Date()
    song.updatedAt = new Date()
    //stringify the json objects
    song.summary = JSON.stringify(song.summary)
    song.lyrics = JSON.stringify(song.lyrics)

    // insert into ArtistSungSongs, ArtistWrittenSongs, ArtistComposedSongs
    let singers_array = []
    let lyricists_array = []
    let music_directors_array = []

    //convert this to for of loop
    for (let singer of song.singers) {
      let artist_slug = singer.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      console.log(artist_slug)
      // The following line is not working returns {}
      let artist = await Artist.findOne({ where: { slug: artist_slug } })
      if (!artist) {
        // handle the case where artist is not found
        console.log(`Artist with slug ${artist_slug} not found`)
        return
      }
      let song_from_db = await Song.findOne({ where: { slug: song.slug } })
      singers_array.push({
        // artist_slug: singer.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-'),
        // song_slug: song.slug,
        song_id: song_from_db.id,
        artist_id: artist.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    for (let lyricist of song.lyricists) {
      let artist_slug = lyricist.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      console.log(artist_slug)
      let artist = await Artist.findOne({ where: { slug: artist_slug } })
      if (!artist) {
        // handle the case where artist is not found
        console.log(`Artist with slug ${artist_slug} not found`)
        return
      }
      let song_from_db = await Song.findOne({ where: { slug: song.slug } })
      lyricists_array.push({
        // artist_slug: lyricist.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-'),
        // song_slug: song.slug,
        song_id: song_from_db.id,
        artist_id: artist.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    for (let music_director of song.music_directors) {
      let artist_slug = music_director.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-')
      console.log(artist_slug)
      let artist = await Artist.findOne({ where: { slug: artist_slug } })
      if (!artist) {
        // handle the case where artist is not found
        console.log(`Artist with slug ${artist_slug} not found`)
        return
      }
      let song_from_db = await Song.findOne({ where: { slug: song.slug } })
      music_directors_array.push({
        // artist_slug: music_director.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-'),
        // song_slug: song.slug,
        song_id: song_from_db.id,
        artist_id: artist.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('ArtistSungSongs', singers_array, {});
    await queryInterface.bulkInsert('ArtistWrittenSongs', lyricists_array, {});
    await queryInterface.bulkInsert('ArtistComposedSongs', music_directors_array, {});
  }
}


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
        singers: ['singer 1', 'singer 2'],
        lyricists: ['lyricist 1', 'lyricist 2'],
        music_directors: ['music director 1', 'music director 2'],
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
        singers: ['singer 1'],
        lyricists: ['lyricist 2'],
        music_directors: ['music director 2'],
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
        singers: ['singer 2'],
        lyricists: ['lyricist 1'],
        music_directors: ['music director 2'],
      },
    ]

    await populateSongs(queryInterface, songs_array);
    await populateAssociationTables(queryInterface, songs_array)
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
