import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

// Charger les variables d'environnement
const NEO4J_URL = process.env.NEO4J_URL;
const NEO4J_USER = process.env.NEO4J_USER;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

// Vérifier que les variables sont définies
if (!NEO4J_URL || !NEO4J_USER || !NEO4J_PASSWORD) {
  throw new Error('Les variables d\'environnement NEO4J_URL, NEO4J_USER et NEO4J_PASSWORD doivent être définies dans le fichier .env');
}

// Créer la session Neo4j
const driver = neo4j.driver(
  NEO4J_URL,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

const session = driver.session();

// Fonction pour obtenir la session Neo4j
export const getSession = () => session;

// Fonction pour ajouter un utilisateur dans Neo4j
export const createUserInNeo4j = async (name, email) => {
  try {
    await session.run(
      'CREATE (u:User {name: $name, email: $email})',
      { name, email }
    );
    console.log('User added to Neo4j');
  } catch (error) {
    console.error('Error adding user to Neo4j:', error);
  }
};
