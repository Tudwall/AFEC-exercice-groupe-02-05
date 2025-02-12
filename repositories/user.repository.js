import mariadb from "mariadb";

class UserRepository {
	constructor() {
		this.pool = mariadb.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			port: process.env.DB_PORT,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
	}
	async createUser({ id, name, email, password }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			await conn.query(
				"INSERT INTO Users (id, name, email, password) VALUES (?,?,?,?)",
				[id, name, email, password]
			);
			return { id, name, email, password };
		} catch (err) {
			throw new Error(
				"Erreur lors de la création de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUsers() {
		let conn;
		try {
			conn = await this.pool.getConnection();
			return await conn.query("SELECT * FROM Users");
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération des utilisateurs: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUserById(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			return await conn.query("SELECT * FROM Users WHERE id = ?", [id]);
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur:" + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async updateUser(id, { name, email, password }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(
				"UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?",
				[name, email, password, id]
			);
			if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");
			return { id, name, email, password };
		} catch (error) {
			throw new Error(
				"Erreur lors de la mise à jour de l'utilisateur" + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async deleteUser(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query("DELETE FROM Users WHERE  id = ?", [id]);
			if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");

			return { message: "Utilisateur supprimé avec succés" };
		} catch (error) {
			throw new Error(
				"Erreur lors de la suppression de l'utilisateur" + message.err
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default UserRepository;
