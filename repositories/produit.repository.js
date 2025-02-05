import mariadb from "mariadb";
import "dotenv/config";
console.log(process.env.DATABASE);
class ProduitRepository {
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

  async getProduits() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const products = await conn.query("SELECT * FROM produits");
      return products;
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
    }
  }
}

const prodRepo = new ProduitRepository();
// add product
// const product = await prodRepo.createProduit(1, 'Chips', 28, 30);
// console.log(product);
// Get products :
// const produits = await prodRepo.getProduits();
// console.log(produits);

export default ProduitRepository;
