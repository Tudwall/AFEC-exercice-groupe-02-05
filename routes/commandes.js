import express from "express";
import CommandeController from "../controllers/commande.controller.js";

const router = express.Router();
const commandeController = new CommandeController();

router.post("/", (req, res) => commandeController.createCommande(req, res));

export default router;
