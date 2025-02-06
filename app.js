import express from "express";
import dotenv from "dotenv";
import produitRoutes from "./routes/produits.js";
import userRoutes from "./routes/users.js";
import commandeRoutes from "./routes/commandes.js";
import detailsCommandeRoutes from "./routes/detailsCommandes.js"

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./doc/swaggerUser.json" with {type: "json"};

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/produits", produitRoutes);
app.use("/users", userRoutes);
app.use('/commandes', commandeRoutes);
app.use("/detailsCommandes", detailsCommandeRoutes);

app.listen(PORT, () => {
	console.log(`le serveur tourne actuellement sur http://localhost:${PORT}`);
});
