import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

class ProduitRepository {
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

  async getProduits() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const products = await conn.query("SELECT * FROM produits");
      return products;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération des produits: " + err.message
      );
    } finally {
      if (conn) conn.release();
    }
  }

  async createProduit({ id, name, stock, price }) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      await conn.query(
        `INSERT INTO produits (id, name, stock, price)
               VALUES (?,?,?,?)`,
        [id, name, stock, price]
      );
      return { id, name, stock, price };
    } catch (err) {
      throw new Error("Erreur lors de la création du produit : " + err.message);
    } finally {
      if (conn) conn.release();
    }
  }

  async getProduitById(id) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const product = await conn.query(
        `SELECT * FROM produits
                WHERE id =?
                `,
        [id]
      );
      return product;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération du produit :" + err.message
      );
    } finally {
      if (conn) conn.release();
    }
  }
  async deleteProduit(id) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(
        `DELETE FROM produits
                WHERE id =?
                `,
        [id]
      );
      if (result.affectedRows === 0) throw new Error("Produit non trouvé");
      return { message: "Produit supprimé avec succés" };
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération du produit :" + err.message
      );
    } finally {
      if (conn) conn.release();
    }
  }
  async updateProduit(id, { name, stock, price }) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(
        `UPDATE produits SET name=?,stock=?,price=?
                WHERE id =?
                `,
        [name, stock, price, id]
      );
      if (result.affectedRows === 0) throw new Error("Produit non trouvé");
      return { id, name, stock, price };
    } catch (err) {
      console.error(err);

      throw new Error(
        "Erreur lors de la mise à jour du produit :" + err.message
      );
    } finally {
      if (conn) conn.release();
    }
  }
}


export default ProduitRepository;
