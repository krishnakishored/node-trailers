// service of the song
// performs business logic and interacts with the repository (database layer)
const SongRepository = require('../repositories/SongRepository.js');
class SongService {

    //TODO: try dependency injection
    constructor() {
        this.SongRepository = new SongRepository();
    }

    //retrieve song by unique slug
    async getBySlug(slug) {
        // return only selected fields
        const selectedFields = ['title', 'slug', 'lyrics', 'summary'];
        return await this.SongRepository.getBySlug(slug, selectedFields);
    }

    // get all songs
    async getAll() {
        return await this.SongRepository.getAll();
    }
    // get song by id
    async getById(id) {
        return await this.SongRepository.getById(id);
    }
    // create a new song
    async create(song) {
        // create a slug from the song title if it doesn't exist
        // explain the regex - replace(/[*+~.()'"!:@\s]+/g, '-')
        // replace any of the characters in the square brackets with a dash 
        // the + means one or more of the characters
        // the g means global - do it for all characters in the string
        // the \s means space
        if (!song.slug) {
            song.slug = song.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-');
        }
        return await this.SongRepository.create(song);
    }
    // delete a song by id
    async delete(id) {
        return await this.SongRepository.delete(id);
    }
    // update a song by id
    async update(id, song) {
        // update the slug if the title has changed
        if (song.title) {
            //replace spaces or dots with dashes
            song.slug = song.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-');
        }
        return await this.SongRepository.update(id, song);
    }
    // patch
    async patch(id, song) {
        if (song.title) {
            // update the slug if the title has changed
            song.slug = song.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-');
        }
        return await this.SongRepository.patch(id, song);
    }

}

module.exports = SongService;