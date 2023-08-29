// sample queries using sequelize

const { Album, Song } = require('./models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// // Find all albums with their associated songs
// // Raw SQL: SELECT * FROM "Albums" JOIN "Songs" ON "Songs"."album_slug" = "Albums".slug;
const findAlbumsWithSongs = async () => {
    // eager loading using include option
    const albums_with_songs = await Album.findAll({
        include: [{
            model: Song
        }]
    });
    console.log("All albums with their associated songs:")
    console.log(JSON.stringify(albums_with_songs, null, 4));
}

// Find all songs with their associated albums
// Raw SQL: SELECT * FROM "Songs" JOIN "Albums" ON "Songs"."album_slug" = "Albums".slug;
const findSongsWithAlbums = async () => {
    // eager loading using include option
    const songs_with_albums = await Song.findAll({
        include: [{
            model: Album
        }]
    });
    console.log("All songs with their associated albums:")
    console.log(JSON.stringify(songs_with_albums, null, 4));
}

const run = async () => {

    // Find all albums
    // const albums = await Album.findAll();


    // const albums = await Album.findAll({
    //     // find all albums where the title includes a "2"
    //     where: {
    //         title: {
    //             [Op.like]: '%2%'
    //         }
    //     }
    // });
    // console.log(albums.every(album => album instanceof Album)); // true
    // console.log("All Albums:", JSON.stringify(albums, null, 2));



    // await findAlbumsWithSongs();
    await findSongsWithAlbums();
    process.exit();
}
run();