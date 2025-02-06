import express from "express";
import CommandeController from "../controllers/commande.controller.js";

const router = express.Router();
const commandeController = new CommandeController();

router.get("/", (req, res) => commandeController.getCommandes(req, res));
router.post("/", (req, res) => commandeController.createCommande(req, res));

export default router;
