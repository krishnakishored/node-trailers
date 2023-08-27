// Orchestrates request and response handling associated with the Album model
const AlbumService = require('../services/AlbumService.js');

class AlbumController {
    constructor() {
        this.AlbumService = new AlbumService();
    }

    async getBySlug(req, res) {
        try {
            const album = await this.AlbumService.getBySlug(req.params.slug);
            if (album) {
                return res.status(200).send(album);
            }
            return res.status(404).send('Album with the specified slug does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving album');
        }
    }

    async getAll(req, res) {
        try {
            const albums = await this.AlbumService.getAll();
            return res.status(200).send(albums);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving albums');
        }
    }

    async getById(req, res) {
        try {
            const album = await this.AlbumService.getById(req.params.id);
            if (album) {
                return res.status(200).send(album);
            }
            return res.status(404).send('Album with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while retrieving album');
        }
    }

    async create(req, res) {
        try {
            const album = await this.AlbumService.create(req.body);
            return res.status(201).send(album);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while creating album');
        }
    }

    async update(req, res) {
        try {
            const album = await this.AlbumService.update(req.params.id, req.body);
            if (album) {
                return res.status(200).send(album);
            }
            return res.status(404).send('Album with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while updating album');
        }
    }

    async delete(req, res) {
        try {
            const album = await this.AlbumService.delete(req.params.id);
            if (album) {
                return res.status(200).send(album);
            }
            return res.status(404).send('Album with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while deleting album');
        }
    }

    async patch(req, res) {
        try {
            const album = await this.AlbumService.patch(req.params.id, req.body);
            if (album) {
                return res.status(200).send(album);
            }
            return res.status(404).send('Album with the specified ID does not exists');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error while patching album');
        }
    }

}
module.exports = AlbumController;    