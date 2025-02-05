import ProduitService from "../services/produit.service.js";

class ProduitController {
	constructor() {
		this.produitService = new ProduitService();
	}

	async createProduit(req, res) {
		const { id, name, stock, price } = req.body;
		try {
			const newProduit = await this.produitService.createProduit({
				id,
				name,
				stock,
				price,
			});
			res.status(201).json(newProduit);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async getProduits(req, res) {
		try {
			const produits = await this.produitService.getProduits();
			res.status(200).json({ produits });
		} catch (err) {
			throw new Error({ err: err.message });
		}
	}

	async getProduitById(req, res) {
		const { id } = req.params;
		try {
			const produit = await this.produitService.getProduitById(id);
			res.status(200).json({ produit });
		} catch (err) {
			res.status(404).json({ err: err.message });
		}
	}

	async updateProduit(req, res) {
		const { id } = req.params;
		const { name, stock, price } = req.body;
		try {
			const updatedProduit = await this.produitService.updateProduit(id, {
				name,
				stock,
				price,
			});
			res.status(200).json(updatedProduit);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async deleteProduit(req, res) {
		const { id } = req.params;
		try {
			const result = await this.produitService.deleteProduit(id);
			res.status(200).json(result);
		} catch (err) {
			res.status(500).json({ err: err.message });
		}
	}
}

export default ProduitController;
