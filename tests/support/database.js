import { Pool } from 'pg';

import 'dotenv/config';

const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}

const pool = new Pool(DbConfig);

export async function executeQuery(query, params = []){
    const client = await pool.connect();
    try{
        return await client.query(query, params);
    } finally {
       client.release();
    }

}