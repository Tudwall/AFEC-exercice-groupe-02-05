import mariadb from 'mariadb';
import 'dotenv/config';
class ProduitRepository {
    constructor() {
        this.pool = mariadb.createPool(
            {
                host: '127.0.0.1',
                port: '3307',
                user: 'sam',
                password: 'root',
                database: 'gestionstock',
                connectionLimit: 5
            }
        )
    }
    async getProduits() {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const products = await conn.query('SELECT * FROM produits');
            return products
        } catch (err) {
            console.error(err);

        }
    }
    async createProduit(id, name, stock, price) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            const product = await conn.query(
                `INSERT INTO produits(id,name,stock,price)
               VALUES (?,?,?,?)`, [id, name, stock, price]);
            return product
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
                `, [id]);
            return product
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
const produits = await prodRepo.getProduits();
console.log(produits);

// const pool = mariadb.createPool(
//     {
//         host: process.env.DB_HOST_NAME,
//         port: process.env.DB_PORT,
//         user: process.env.DB_USER,
//         password: process.env.DB_USER_PASSWORD,
//         database: process.env.DB_NAME,
//         connectionLimit: 5
//     }
// )


export default ProduitRepository;