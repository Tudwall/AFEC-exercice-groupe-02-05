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
}
export default CommandeController;