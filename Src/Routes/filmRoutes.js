const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {

    res.send('Détails du film')
});

router.get('/popular', (req, res) => {
    res.send('Films populaires')
});

module.exports = router;
