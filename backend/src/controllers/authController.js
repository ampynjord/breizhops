// src/controllers/authController.js
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Assure-toi d'importer le modèle Sequelize User

// Fonction pour enregistrer un utilisateur
export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validation des données d'entrée
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur dans la base de données
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Répondre avec le succès de l'inscription
    return res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
  }
}
