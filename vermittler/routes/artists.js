// define routes for the Artist table using express

// const config = require('../config/config.js');
const express = require('express');
const router = express.Router();

const ArtistController = require('../controllers/ArtistController.js');
const artistController = new ArtistController();


//TODO:use middleware to log requests

// retrieve artist by unique slug
router.get('/slug/:slug', async (req, res, next) => {
    return await artistController.getBySlug(req, res);
});

router.get('/:id', async (req, res, next) => {
    return await artistController.getById(req, res);
});

router.put('/:id', async (req, res, next) => {
    return await artistController.update(req, res);
});

router.delete('/:id', async (req, res, next) => {
    return await artistController.delete(req, res);
});

router.patch('/:id', async (req, res, next) => {
    return await artistController.patch(req, res);
});

router.get('/', async (req, res, next) => {
    return await artistController.getAll(req, res);
});

router.post('/', async (req, res, next) => {
    return await artistController.create(req, res);
});



module.exports = router;