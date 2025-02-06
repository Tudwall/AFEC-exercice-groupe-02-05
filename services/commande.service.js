import CommandeRepository from "../repositories/commande.repository.js";


class CommandeService {
  constructor() {
    this.commandeRepository = new CommandeRepository();
  }

  async getCommandes() {
    try {
      return await this.commandeRepository.getCommandes();
    } catch (err) {
      throw new Error(err.message);
    }
  }

	async createCommande({ id, user_id, date, total_price, status }) {
		try {
			return await this.commandeRepository.createCommande({
				id,
				user_id,
				date,
				total_price,
				status,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}
  async deleteCommande(id) {
        try {
            const deletedProduit = await this.commandeRepository.deleteCommande(id);
            if (!deletedProduit) {
                throw new Error("Commande Introuvable introuvable");
            }
            return { message: "Commande supprimé" };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default CommandeService;

