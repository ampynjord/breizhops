import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/database.js';

// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Route d'exemple
app.get('/', (req, res) => {
  res.status(200).json({ message: '✅ Backend is working!' });
});

// Connexion DB
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');

    // Lancement du serveur uniquement si la DB est OK
    const PORT = process.env.API_PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
