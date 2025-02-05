import express from "express";
import dotenv from "dotenv";
import produitRoutes from "./routes/produits.js";
/* import seedProduits from"./" */

dotenv.config();
const app = express();
const PORT = 3003;

app.use(express.json());
app.use("/produits", produitRoutes);

app.listen(PORT, () => {
  console.log(`le serveur tourne actuellement sur http://localhost:${PORT}`);
});
