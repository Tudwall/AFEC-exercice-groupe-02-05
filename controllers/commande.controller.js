import CommandeService from "../services/commande.service.js";

class CommandeController {

    constructor() {
        this.commandeService = new CommandeService();
    }
    async deleteCommande(req, res) {
        const { id } = req.params;
        try {
            const result = await this.commandeService.deleteCommande(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    }
  async getCommandes(req, res) {
    try {
      const commandes = await this.commandeService.getCommandes();
      res.status(200).json({ commandes });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

	async createCommande(req, res) {
		const { id, user_id, date, total_price, status } = req.body;
		try {
			const newCommande = await this.commandeService.createCommande({
				id,
				user_id,
				date,
				total_price,
				status,
			});
			res.status(201).json(newCommande);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
}

export default CommandeController;

