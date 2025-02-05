import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

class UserRepository {
  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
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
    } catch (error) {
      throw new Error(
        "Erreur lors de la création de l'utilisateur: " + error.message
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
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des utilisateurs: " + error.message
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
        "Erreur lors de la récupération de l'utilisateur:" + error.message
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
        "UPDATE USER SET pfp = ?, name = ?, bio = ?, email = ?, password = ? WHERE id = ?",
        [id, name, email, password]
      );
      if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");
      return { id, name, email, password };
    } catch (error) {
      throw new Error(
        "Erreur lors de la mise à jour de l'utilisateur" + message.error
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
        "Erreur lors de la suppression de l'utilisateur" + message.error
      );
    } finally {
      if (conn) conn.release();
    }
  }
}

export default UserRepository;
