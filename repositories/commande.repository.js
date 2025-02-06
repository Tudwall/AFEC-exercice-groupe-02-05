import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

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
}
export default CommandeRepository;

