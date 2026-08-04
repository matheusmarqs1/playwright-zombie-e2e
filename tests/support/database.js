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

export async function executeQuery(query){
    let client;
    try{
        client = await pool.connect();
        const result = await client.query(query);
        return result;
        
    } catch(error){
        console.log('Error executing query: ', error);
    } finally {
        if (client) {
            client.release();
        }
    }

}