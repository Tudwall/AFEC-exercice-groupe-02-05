import express from "express";
import DetailsCommandeController from "../controllers/detailsCommande.controller.js";

const router = express.Router();
const detailsCommandeController = new DetailsCommandeController();

router.post("/", (req, res) =>
	detailsCommandeController.createDetailsCommande(req, res)
);

export default router;
