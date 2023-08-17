// Orchestrates request and response handling associated with the artist model
const ArtistService = require('../services/ArtistService.js');

class ArtistController {
    constructor() {
        this.ArtistService = new ArtistService();
    }
    async getAll(req, res) {
        const artists = await this.ArtistService.getAll();
        return res.status(200).send(artists);
    }
    async getById(req, res) {
        const artist = await this.ArtistService.getById(req.params.id);
        if (artist) {
            return res.status(200).send(artist);
        }
        return res.status(404).send('Artist with the specified ID does not exists');
    }
    async create(req, res) {
        const artist = await this.ArtistService.create(req.body);
        return res.status(201).send(artist);
    }
    async update(req, res) {
        const artist = await this.ArtistService.update(req.params.id, req.body);
        if (artist) {
            return res.status(200).send(artist);
        }
        return res.status(404).send('Artist with the specified ID does not exists');
    }
    async delete(req, res) {
        const artist = await this.ArtistService.delete(req.params.id);
        if (artist) {
            return res.status(200).send('Artist was deleted.');
        }
        return res.status(404).send('Artist with the specified ID does not exists');
    }
}

module.exports = ArtistController;