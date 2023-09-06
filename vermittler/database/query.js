// sample queries using sequelize

const { Album, Song, Artist, sequelize } = require('./models')
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op



// // Find all albums with their associated songs
// // Raw SQL: SELECT * FROM "Albums" JOIN "Songs" ON "Songs"."album_slug" = "Albums".slug;
const findAlbumsWithSongs = async () => {
    // eager loading using include option
    const albums_with_songs = await Album.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [{
            model: Song,
            attributes: ["title", "slug"]
        }]
    });
    console.log("All albums with their associated songs:")
    console.log(JSON.stringify(albums_with_songs, null, 4));
}

// Find all songs with their associated albums
// Raw SQL: SELECT * FROM "Songs" JOIN "Albums" ON "Songs"."album_slug" = "Albums".slug;
const findAllSongsWithAlbums = async () => {
    // eager loading using include option
    const songs_with_albums = await Song.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [{
            model: Album,
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
        }]
    });
    console.log("All songs with their associated albums:")
    console.log(JSON.stringify(songs_with_albums, null, 4));
}

const findAlbumsUsingOp = async () => {
    const albums = await Album.findAll({
        // where: {
        // get all albums where the year is greater than or equal to 2001
        //     year: {
        //         [Op.gte]: 2001
        //     }
        // }

        where: {
            // all telugu albums
            language: {
                [Op.eq]: 'telugu'
            }
        }

        // where: {
        //     // find all albums where the title includes a "2"
        //     title: {
        //         [Op.like]: '%2%'
        //     }
        // }
    });
    console.log("albums filtered:")
    console.log(JSON.stringify(albums, null, 4));
}


const findAlbumsUsingRawSQL = async () => {
    // raw sql query

    const albums = await sequelize.query(
        'SELECT * FROM "Albums" WHERE title LIKE :title',
        {
            replacements: { title: '%2%' },
            type: QueryTypes.SELECT
        }
    );
    console.log(albums)
}

// Define a function to fetch a song and its associated artists
async function fetchSongWithArtists(songSlugToFetch) {
    console.log('Fetching song with slug:', songSlugToFetch);
    try {
        // const song = await Song.findOne({ where: { slug: songSlugToFetch } });
        const song = await Song.findOne(
            {
                where: {
                    slug: songSlugToFetch,
                },
                include: [
                    {
                        model: Artist,
                        as: 'singers',
                        through: 'ArtistSungSongs',
                    },
                    {
                        model: Artist,
                        as: 'music_directors',
                        through: 'ArtistComposedSongs',
                    },
                    {
                        model: Artist,
                        as: 'lyricists',
                        through: 'ArtistWrittenSongs',
                    },
                ],
            });
        console.log(JSON.stringify(song))

        // if (song) {
        //     console.log('Song Title:', song.title);

        //     console.log('Singers:');
        //     song.singers.forEach(singer => {
        //         console.log(singer.name);
        //     });

        //     console.log('Composers:');
        //     song.music_directors.forEach(composer => {
        //         console.log(composer.name);
        //     });

        //     console.log('Lyricists:');
        //     song.lyricists.forEach(lyricist => {
        //         console.log(lyricist.name);
        //     });
        // } else {
        //     console.log('Song not found.');
        // }
    } catch (error) {
        console.error('Error:', error);
    }
}


const run = async () => {

    // await findAlbumsWithSongs();
    // await findAllSongsWithAlbums();
    // await findAlbumsUsingOp();
    // await findAlbumsUsingRawSQL();

    // // get all albums
    // const albums = await Album.findAll();
    // console.log(albums)
    // // get all songs
    // const songs = await Song.findAll();

    // // get all songs of an album
    // const songs = await Song.findAll({ where: { album_slug: 'album-2-2001-tamil' } });
    // console.log(songs)
    // // get the album of a song
    // const song = await Song.findOne({ where: { slug: 'album-1-2000-telugu-song-1' } });
    // console.log(JSON.stringify(song))
    // const album = await song.getAlbum();
    // console.log(album)
    // // get the songs of an album
    // const album = await Album.findOne({ where: { slug: 'album-1-2000-telugu' } });
    // console.log(JSON.stringify(album))
    // const songs = await album.getSongs();
    // console.log(JSON.stringify(songs))


    // // Usage: Fetch a song and its associated artists
    let songSlugToFetch = 'album-1-2000-telugu-song-1'; // Replace with the slug of the song you want to fetch
    await fetchSongWithArtists(songSlugToFetch);


    process.exit();
}
run();