// service of the artist
// performs business logic and interacts with the repository (database layer)
const ArtistRepository = require('../repositories/ArtistRepository.js');

class ArtistService {
    constructor() {
        this.ArtistRepository = new ArtistRepository();
    }
    // get all artists
    async getAll() {
        const artists = await this.ArtistRepository.getAll();
        return artists;
    }
    // get artist by id
    async getById(id) {
        const artist = this.ArtistRepository.getById(id);
        return artist
    }
    // create a new artist
    add(artist) {
        return this.ArtistRepository.add(artist);
    }
    // delete a artist by id
    delete(id) {
        return this.ArtistRepository.delete(id);
    }
    // update a artist by id
    update(id, artist) {
        return this.ArtistRepository.update(id, artist);
    }
}
module.exports = ArtistService;

