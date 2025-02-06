import mariadb from "mariadb";

class DetailsCommandeRepository {
	constructor() {
		this.pool = mariadb.createConnection({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
	}

	async createDetailsCommande({ id, commande_id, product_id, quantity }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			await conn.query(
				"INSERT INTO Details_Commande (id, commande_id, product_id, quantity) VALUES (?, ?, ?, ?",
				[id, commande_id, product_id, quantity]
			);
			return { id, commande_id, product_id, quantity };
		} catch (err) {
			throw new Error(
				"Erreur lors de la création des détails de la commande: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default DetailsCommandeRepository;
