// define routes for the Artist table using express

// const config = require('../config/config.js');
const express = require('express');
const router = express.Router();

const ArtistController = require('../controllers/ArtistController.js');
const artistController = new ArtistController();

router.get('/:id', async (req, res, next) => {
    const artist = await artistController.getById(req, res);
    res.json(artist);
});

router.get('/', async (req, res, next) => {
    const artists = await artistController.getAll(req, res);
    res.json(artists);
});

module.exports = router;