import app from "./server"
import sequelize from "./models";

const PORT = process.env.PORT ||3000;

sequelize.sync()
    .then(() => {
        console.log("Base de données synchronisée");

        app.listen(PORT, () => {
            console.log(` Serveur en ligne sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erreur de synchronisation Sequelize ",err)
    });

