import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './db/postgres.js';
import { getSession } from './db/neo4j.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('BreizhOps API running ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


app.get('/test/postgres', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ postgres: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Postgres error', details: err.message });
    }
});

app.get('/test/neo4j', async (req, res) => {
    const session = getSession();
    try {
        const result = await session.run('RETURN "Neo4j OK" AS message');
        res.json({ neo4j: result.records[0].get('message') });
    } catch (err) {
        res.status(500).json({ error: 'Neo4j error', details: err.message });
    } finally {
        await session.close();
    }
});