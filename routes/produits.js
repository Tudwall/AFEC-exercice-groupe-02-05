import express from "express";
import ProduitController from "../controllers/produit.controller.js";

const router = express.Router();
const produitController = new ProduitController();

router.post("/", (req, res) => produitController.createProduit(req, res));
router.get("/:id", (req, res) => produitController.getProduitById(req, res));
router.get("/", (req, res) => produitController.getProduits(req, res));
router.put("/:id", (req, res) => produitController.updateProduit(req, res));
router.delete("/:id", (req, res) => produitController.deleteProduit(req, res));

export default router;
