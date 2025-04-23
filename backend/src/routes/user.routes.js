import express from 'express';
import pool from '../db/postgres.js';
import { getSession } from '../db/neo4j.js';

const router = express.Router();

// Créer un user dans les 2 BDD
router.post('/create', async (req, res) => {
  const { name, email } = req.body;

  const pgQuery = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const session = getSession();

  try {
    // PostgreSQL
    const pgResult = await pool.query(pgQuery, [name, email]);

    // Neo4j
    await session.run(
      'CREATE (u:User {name: $name, email: $email})',
      { name, email }
    );

    res.status(201).json({ success: true, user: pgResult.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
});

export default router;
