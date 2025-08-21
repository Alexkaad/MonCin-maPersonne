import dotenv from 'dotenv';

const { Sequelize } = require('sequelize');

console.log('\n=== VÉRIFICATION DES VARIABLES D\'ENVIRONNEMENT ===\n');

// Chargement du fichier .env.local
const dotenvResult = dotenv.config({ path: './.env.local' });

console.log('📂 Chemin de travail actuel:', process.cwd());
console.log('📄 Fichier vérifié: .env.local');

if (dotenvResult.error) {
    console.error('❌ Erreur de chargement:', dotenvResult.error.message);
    process.exit(1);
}

console.log('✅ Fichier .env.local chargé avec succès\n');
console.log('=== VARIABLES TROUVÉES ===\n');
console.log('DATABASE_URL:', process.env.DATABASE_URL);

console.log('\n=== TEST DE CONNEXION À LA BASE DE DONNÉES ===\n');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie !');
    } catch (error: any) {
        console.error('❌ Impossible de se connecter à la base de données:', error.message);
    } finally {
        await sequelize.close();
    }
}

testConnection();