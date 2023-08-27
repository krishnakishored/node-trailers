//define routes for the Song table using express
const express = require('express');
const router = express.Router();

const AlbumController = require('../controllers/AlbumController.js');
const albumController = new AlbumController();

router.get('/slug/:slug', async (req, res, next) => {
    return await albumController.getBySlug(req, res);
});

router.get('/:id', async (req, res, next) => {
    return await albumController.getById(req, res);
});

router.put('/:id', async (req, res, next) => {
    return await albumController.update(req, res);
});

router.delete('/:id', async (req, res, next) => {
    return await albumController.delete(req, res);
});

router.patch('/:id', async (req, res, next) => {
    return await albumController.patch(req, res);
});

router.get('/', async (req, res, next) => {
    return await albumController.getAll(req, res);
});

router.post('/', async (req, res, next) => {
    return await albumController.create(req, res);
});

module.exports = router;