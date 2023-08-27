// this is where we define functions to interact with the database layer

const models = require('../database/models');

class SongRepository {
    //retrieve song by unique slug
    async getBySlug(slug, selectedFields) {
        return await models.Song.findOne({
            where: {
                slug: slug
            },
            attributes: selectedFields
        });
    }
    // get all songs
    async getAll() {
        return await models.Song.findAll();
    }
    // get song by id
    async getById(id) {
        return await models.Song.findByPk(id);
    }

    // create a new song
    async create(song) {
        return await models.Song.create(song);
    }

    // delete a song by id
    async delete(id) {
        return await models.Song.destroy({
            where: {
                id: id
            }
        });
    }

    // update a song by id
    async update(id, song) {
        return await models.Song.update(song, {
            where: {
                id: id
            }
        });
    }
    // patch
    async patch(id, song) {
        return await models.Song.update(song, {
            where: {
                id: id
            }
        });
    }
}

module.exports = SongRepository;