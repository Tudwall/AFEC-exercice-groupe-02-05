import mariadb from "mariadb";

class CommandeRepository {
  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      connectionLimit: 5,
    });
  }

  async getCommandes() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const commandes = await conn.query("SELECT * FROM commandes");
      return commandes;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération des commandes" + err.message
      );
    } finally {
      if (conn) conn.release();
    }
  }
}

export default CommandeRepository;
