import DetailsCommandeRepository from "../repositories/detailsCommande.repository.js";

class DetailsCommandeService {
	constructor() {
		this.detailsCommandeRepository = new DetailsCommandeRepository();
	}

	async createDetailsCommande({ id, commande_id, product_id, quantity }) {
		try {
			return await this.detailsCommandeRepository.createDetailsCommande({
				id,
				commande_id,
				product_id,
				quantity,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default DetailsCommandeService;
