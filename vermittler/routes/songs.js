// define routes for the Song table using express
const express = require('express');
const router = express.Router();

const SongController = require('../controllers/SongController.js');
const songController = new SongController();

router.get('/slug/:slug', async (req, res, next) => {
    return await songController.getBySlug(req, res);
});

router.get('/:id', async (req, res, next) => {
    return await songController.getById(req, res);
});

router.put('/:id', async (req, res, next) => {
    return await songController.update(req, res);
});

router.delete('/:id', async (req, res, next) => {
    return await songController.delete(req, res);
});

router.patch('/:id', async (req, res, next) => {
    return await songController.patch(req, res);
});

router.get('/', async (req, res, next) => {
    return await songController.getAll(req, res);
});

router.post('/', async (req, res, next) => {
    return await songController.create(req, res);
});

module.exports = router;
