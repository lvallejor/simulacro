const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: 5432,
});

const insertarUsuario = async (email, password) => {
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (email, password, auth) VALUES ($1, $2, $3, false) RETURNING *",
      [email, password]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (email, password) => {
  const result = await pool.query("SELECT * FROM usuarios where email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = { insertarUsuario, getUser };
