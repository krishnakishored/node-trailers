// sample queries using sequelize

const { Album, Song } = require('./models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// Find all albums with their associated songs
// Raw SQL: SELECT * FROM "Albums" JOIN "Songs" ON "Songs"."album_slug" = "Albums".slug;

//TODO: fix this query

const findAllWithSongs = async () => {
    const albums = await Album.findAll({
        include: [{
            model: Song
        }]
    });
    console.log("All songs with their associated albums:", JSON.stringify(albums, null, 4));
}


const run = async () => {
    await findAllWithSongs();
    process.exit();
}
run();

run()