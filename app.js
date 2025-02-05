import express from "express";
import produitRouter from "../AFEC-exercice-groupe-02-05/routes/produit.js";
const app = express();

app.use(express.json());
app.use("/produits", produitRouter);

export default app;
