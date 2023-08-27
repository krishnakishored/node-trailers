// Orchestrates request and response handling associated with the song model
const SongService = require('../services/SongService.js');

class SongController {
    constructor() {
        this.SongService = new SongService();
    }

    // retrieve song by unique slug
    async getBySlug(req, res) {
        try {
            const song = await this.SongService.getBySlug(req.params.slug);
            if (song) {
                return res.status(200).send(song);
            }
            return res.status(404).send('Song with the specified slug does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving song');
        }
    }

    async getAll(req, res) {
        try {
            const songs = await this.SongService.getAll();
            return res.status(200).send(songs);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving songs');
        }
    }

    async getById(req, res) {
        try {
            const song = await this.SongService.getById(req.params.id);
            if (song) {
                return res.status(200).send(song);
            }
            return res.status(404).send('Song with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving song');
        }
    }

    async create(req, res) {
        try {
            const song = await this.SongService.create(req.body);
            return res.status(201).send(song);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while creating song');
        }
    }

    async update(req, res) {
        try {
            const song = await this.SongService.update(req.params.id, req.body);
            if (song) {
                return res.status(200).send(song);
            }
            return res.status(404).send('Song with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while updating song');
        }
    }

    async delete(req, res) {
        try {
            const song = await this.SongService.delete(req.params.id);
            if (song) {
                return res.status(200).send('Song deleted');
            }
            return res.status(404).send('Song with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while deleting song');
        }
    }

    async patch(req, res) {
        try {
            const song = await this.SongService.patch(req.params.id, req.body);
            if (song) {
                return res.status(200).send(song);
            }
            return res.status(404).send('Song with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while patching song');
        }
    }
}

module.exports = SongController;
