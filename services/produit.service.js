import ProduitRepository from "../repositories/produit.repository.js";

class ProduitService {
	constructor() {
		this.produitRepository = new ProduitRepository();
	}

	async createProduit({ id, name, stock, price }) {
		try {
			return await this.produitRepository.createProduit({
				id,
				name,
				stock,
				price,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getProduits() {
		try {
			return await this.produitRepository.getProduits();
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getProduitById(id) {
		try {
			return await this.produitRepository.getProduitById(id);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async updateProduit(id, { name, stock, price }) {
		try {
			const updatedProduit = await this.produitRepository.updateProduit(id, {
				name,
				stock,
				price,
			});
			if (!updatedProduit) {
				throw new Error("Produit introuvable");
			}
			return updatedProduit;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async deleteProduit(id) {
		try {
			const deletedProduit = await this.produitRepository.deleteProduit(id);
			if (!deletedProduit) {
				throw new Error("Produit introuvable");
			}
			return { message: "Produit supprimé" };
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default ProduitService;
