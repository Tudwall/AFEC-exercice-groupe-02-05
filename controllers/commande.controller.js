import CommandeService from "../services/commande.service.js";

class CommandeController {
  constructor() {
    this.commandeService = new CommandeService();
  }
  async getCommandes(req, res) {
    try {
      const commandes = await this.commandeService.getCommandes();
      res.status(200).json({ commandes });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
}

export default CommandeController;
