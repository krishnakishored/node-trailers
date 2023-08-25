// service of the artist
// performs business logic and interacts with the repository (database layer)
const ArtistRepository = require('../repositories/ArtistRepository.js');

class ArtistService {
    constructor() {
        this.ArtistRepository = new ArtistRepository();
    }
    // get all artists
    async getAll() {
        return await this.ArtistRepository.getAll();

    }
    // get artist by id
    async getById(id) {
        return await this.ArtistRepository.getById(id);
    }
    // create a new artist
    async create(artist) {
        // create a slug from the artist name if it doesn't exist
        if (!artist.slug) {
            artist.slug = artist.name.toLowerCase().replace(/[ .]/g, '-');
        }
        return await this.ArtistRepository.create(artist);
    }
    // delete a artist by id
    async delete(id) {
        return await this.ArtistRepository.delete(id);
    }
    // update a artist by id
    async update(id, artist) {
        // update the slug if the name has changed
        if (artist.name) {
            //replace spaces or dots with dashes
            artist.slug = artist.name.toLowerCase().replace(/[ .]/g, '-');
        }
        return await this.ArtistRepository.update(id, artist);
    }

    async patch(id, artist) {
        // update the slug if the name has changed
        if (artist.name) {
            artist.slug = artist.name.toLowerCase().replace(/[ .]/g, '-');
        }
        return await this.ArtistRepository.patch(id, artist);
    }
}
module.exports = ArtistService;

