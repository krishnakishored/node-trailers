// performs business logic and interacts with the repository (database layer)
const AlbumRepository = require('../repositories/AlbumRepository.js');
class AlbumService {
    constructor() {
        //TODO: try dependency injection
        this.AlbumRepository = new AlbumRepository();
    }

    //retrieve album by unique slug
    async getBySlug(slug) {
        // return only selected fields
        const selectedFields = ['title', 'slug', 'language', 'year'];
        return await this.AlbumRepository.getBySlug(slug, selectedFields);
    }
    //get all albums
    async getAll() {
        return await this.AlbumRepository.getAll();
    }
    // get album by id
    async getById(id) {
        return await this.AlbumRepository.getById(id);
    }
    // create a new album
    async create(album) {
        // create a slug from the album title if it doesn't exist
        // explain the regex - replace(/[*+~.()'"!:@\s]+/g, '-')
        // replace any of the characters in the square brackets with a dash 
        // the + means one or more of the characters
        // the g means global - do it for all characters in the string
        // the \s means space
        if (!album.slug) {
            album.slug = album.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-');
        }
        return await this.AlbumRepository.create(album);
    }
    // delete a album by id
    async delete(id) {
        return await this.AlbumRepository.delete(id);
    }
    // update a album by id
    async update(id, album) {
        // update the slug if the title has changed
        if (album.title) {
            //replace spaces or dots with dashes
            album.slug = album.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-');
        }
        return await this.AlbumRepository.update(id, album);
    }
    // patch
    async patch(id, album) {
        if (album.title) {
            // update the slug if the title has changed
            album.slug = album.title.toLowerCase().replace(/[*+~.()'"!:@\s]+/g, '-');
        }
        return await this.AlbumRepository.patch(id, album);
    }

}

module.exports = AlbumService;