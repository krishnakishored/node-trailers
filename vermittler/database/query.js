// sample queries using sequelize

const { Album, Song } = require('./models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op




// // Find all albums with their associated songs
// // Raw SQL: SELECT * FROM "Albums" JOIN "Songs" ON "Songs"."album_slug" = "Albums".slug;

// //TODO: fix this query

// const findAllWithSongs = async () => {
//     const albums = await Album.findAll({
//         include: [{
//             model: Song
//         }]
//     });
//     console.log("All songs with their associated albums:", JSON.stringify(albums, null, 4));
// }


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

    // Find All albums with their associated songs, using eager loading; foreign key in the songs table as album_slug
    const albums_with_songs = await Album.findAll({
        include: [{
            model: Song,
            foreignKey: 'album_id',
            // as: 'Songs'
        }]
    });
    console.log("All songs with their associated albums:", JSON.stringify(albums_with_songs, null, 4));
    // await findAllWithSongs();



    process.exit();
}
run();