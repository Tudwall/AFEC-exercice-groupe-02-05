import DetailsCommandeService from "../services/detailsCommande.service.js";

class DetailsCommandeController {
	constructor() {
		this.detailsCommandeService = new DetailsCommandeService();
	}

	async createDetailsCommande(req, res) {
		const { id, commande_id, product_id, quantity } = req.body;
		try {
			const newDetailsCommande =
				await this.detailsCommandeService.createDetailsCommande({
					id,
					commande_id,
					product_id,
					quantity,
				});
			res.status(201).json({ newDetailsCommande });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
}

export default DetailsCommandeController;
