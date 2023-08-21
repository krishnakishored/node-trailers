// this is where we define functions to interact with the database layer
// const Artist = require('../models').Artist;
// const Artist = require('../database/models').Artist;
const models = require('../database/models');

class ArtistRepository {
    // get all artists
    async getAll() {
        return models.Artist.findAll();
    }
    // get artist by id
    async getById(id) {
        return models.Artist.findByPk(id);
    }
    // create a new artist
    async add(artist) {
        return models.Artist.create(artist);
    }
    // delete a artist by id
    async delete(id) {
        return models.Artist.destroy({
            where: {
                id: id
            }
        });
    }
    // update a artist by id
    async update(id, artist) {
        return models.Artist.update(artist, {
            where: {
                id: id
            }
        });
    }
}


module.exports = ArtistRepository;
// export default ArtistRepository; // ES6 module syntax
