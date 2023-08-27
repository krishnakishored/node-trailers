// this is the file that will contain the logic to interact with the database

const models = require('../database/models');

class AlbumRepository {
    //retrieve album by unique slug
    async getBySlug(slug, selectedFields) {
        return await models.Album.findOne({
            where: {
                slug: slug
            },
            attributes: selectedFields
        });
    }

    // get all albums
    async getAll() {
        return await models.Album.findAll();
    }
    // get album by id
    async getById(id) {
        return await models.Album.findByPk(id);
    }
    // create a new album
    async create(album) {
        return await models.Album.create(album);
    }
    // delete a album by id
    async delete(id) {
        return await models.Album.destroy({
            where: {
                id: id
            }
        });
    }

    // update a album by id
    async update(id, album) {
        return await models.Album.update(album, {
            where: {
                id: id
            }
        });
    }
    // patch
    async patch(id, album) {
        return await models.Album.update(album, {
            where: {
                id: id
            }
        });
    }
}

module.exports = AlbumRepository;
