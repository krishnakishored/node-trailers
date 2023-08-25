// Orchestrates request and response handling associated with the artist model
const ArtistService = require('../services/ArtistService.js');

class ArtistController {
    constructor() {
        this.ArtistService = new ArtistService();
    }

    // retrieve artist by unique slug
    async getBySlug(req, res) {
        try {
            const artist = await this.ArtistService.getBySlug(req.params.slug);
            if (artist) {
                return res.status(200).send(artist);
            }
            return res.status(404).send('Artist with the specified slug does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving artist');
        }
    }


    async getAll(req, res) {

        try {
            const artists = await this.ArtistService.getAll();
            return res.status(200).send(artists);
            // const artistsJSON = artists.map(artist => artist.toJSON());
            // return res.status(200).send(artistsJSON);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving artists');

        }
    }

    async getById(req, res) {
        try {
            const artist = await this.ArtistService.getById(req.params.id);
            if (artist) {
                return res.status(200).send(artist);
            }
            return res.status(404).send('Artist with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving artist');

        }
    }

    async create(req, res) {
        try {
            const artist = await this.ArtistService.create(req.body);
            return res.status(201).send(artist);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while creating artist');
        }
    }

    async update(req, res) {
        try {
            const artist = await this.ArtistService.update(req.params.id, req.body);
            if (artist) {
                return res.status(200).send(artist);
            }
            return res.status(404).send('Artist with the specified ID does not exists');

        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while updating artist');
        }
    }

    async delete(req, res) {
        try {
            const artist = await this.ArtistService.delete(req.params.id);
            if (artist) {
                return res.status(200).send('Artist was deleted.');
            }
            return res.status(404).send('Artist with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while deleting artist');
        }
    }

    async patch(req, res) {
        try {
            const artist = await this.ArtistService.patch(req.params.id, req.body);
            if (artist) {
                return res.status(200).send(artist);
            }
            return res.status(404).send('Artist with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while patching artist');
        }
    }
}

module.exports = ArtistController;