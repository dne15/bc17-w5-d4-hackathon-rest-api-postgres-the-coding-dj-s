// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAlbums() {
  // Query the database and return all resource twos
  const queryText = "SELECT * FROM albums";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getAlbumById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = `SELECT * FROM albums
                      WHERE id = $1`;
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createAlbum({ title, published_date, artist_id }) {
  // Query the database to create an resource and return the newly created resource
  const queryText = `INSERT INTO albums (title, published_date, artist_id) 
  VALUES ($1, $2, $3)
  RETURNING *`;
  const values = [title, published_date, artist_id];
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export async function updateAlbumById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
 const queryText = `UPDATE album SET title = $1, published_date = $2, artist_id = $3 WHERE id = $4`
 const values = [id, updates]
 const result = await pool.query(queryText, values);
 return result.rows[0];
}

export async function deleteResourceTwoById(id) {
  // Query the database to delete the resource and return the deleted resource or null
}
