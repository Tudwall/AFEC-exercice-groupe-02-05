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
  async getCommandeById(id) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const commande = await conn.query("SELECT * FROM commandes WHERE id=?", [
        id,
      ]);
      return commande;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération de la commande" + err.message
      );
    } finally {
      if (conn) conn.release();
    }
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

	async createCommande({ id, user_id, date, total_price, status }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			await conn.query(
				"INSERT INTO Commandes (id, user_id, date, total_price, status) VALUES (?, ?, ?, ?, ?)",
				[id, user_id, date, total_price, status]
			);
			return { id, user_id, date, total_price, status };
		} catch (err) {
			throw new Error(
				"Erreur lors de la création de la commande: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
  async deleteCommande(id) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const result = await conn.query(
                `DELETE FROM commandes
                WHERE id =?
                `,
                [id]
            );
            if (result.affectedRows === 0) throw new Error("Commande non trouvé");
            return { message: "Commande  supprimé avec succés" };
        } catch (err) {
            throw new Error(
                "Erreur lors de la récupération de la Commande  :" + err.message
            );
        } finally {
            if (conn) conn.release();
        }
}

export default CommandeRepository;

