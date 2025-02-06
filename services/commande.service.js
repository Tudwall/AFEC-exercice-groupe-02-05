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

  async getCommandeById(id) {
    try {
      return await this.commandeRepository.getCommandeById(id);
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
}

export default CommandeService;
