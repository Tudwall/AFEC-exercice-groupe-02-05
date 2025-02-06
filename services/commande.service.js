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
}

export default CommandeService;
