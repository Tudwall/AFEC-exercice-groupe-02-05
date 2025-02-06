import CommandeRepository from "../repositories/commande.repository.js";
class CommandeService {
    constructor() {
        this.commRep = new CommandeRepository();
    }
    async deleteCommande(id) {
        try {
            const deletedProduit = await this.commRep.deleteCommande(id);
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