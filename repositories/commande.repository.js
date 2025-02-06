import mariadb from "mariadb";

class CommandeRepository {
	constructor() {
		this.pool = new mariadb.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			port: process.env.DB_PORT,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
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
}

export default CommandeRepository;
