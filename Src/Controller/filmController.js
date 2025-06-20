const express = require("express");

const router = express.Router();

const { getPopularFilms } = require("../Services/TmbdServices");

const {findAndCountAll} = require("../Services/TmbdServices");





router.get("/popular", async (req, res) => {
    const page = Math.min(parseInt(req.query.page)|| 1,500) ;


    try {
        const films = await getPopularFilms(page);
        console.log(films);
        res.json(films);
    } catch (error) {
        console.error("Erreur TMDB :", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
});



// Route pour récupérer les films avec pagination
router.get('/', async (req, res) => {
    try {
        // Récupérer les paramètres de pagination depuis la requête
        const page = parseInt(req.query.page) || 1; // Page par défaut = 1
        const limit = parseInt(req.query.limit) || 20; // Nombre d'éléments par page (TMDB utilise 20 par défaut)
        const offset = (page - 1) * limit;

        // Faire la requête à la base de données avec Sequelize
        const films = await findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['popularite', 'DESC']] // Similaire au sort_by de TMDB
        });

        // Préparer la réponse
        const totalPages = Math.ceil(films.count / limit);

        res.json({
            results: films.rows,
            page: page,
            total_pages: totalPages,
            total_results: films.count
        });

    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({
            error: 'Erreur lors de la récupération des films'
        });
    }
});



module.exports = router;
