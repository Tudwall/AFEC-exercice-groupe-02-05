import { PrismaClient } from "@prisma/client";

class UserRepository {
	constructor() {
		this.prisma = new PrismaClient();
	}

	async createUser({ id, name, email, password }) {
		try {
			id = parseInt(id);
			return await this.prisma.users.create({
				data: {
					id,
					name,
					email,
					password,
				},
			});
		} catch (err) {
			throw new Error(
				`Erreur lors de la création de l'utilisateur ${err.message}`
			);
		}
	}

	async getUsers() {
		try {
			return await this.prisma.users.findMany();
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération des utilisateurs: " + err.message
			);
		}
	}

	async getUserById(id) {
		try {
			id = parseInt(id);
			const user = await this.prisma.users.findUnique({
				where: { id },
			});
			if (!user) {
				throw new Error("Utilisateur non trouvé");
			}
			return user;
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur:" + err.message
			);
		}
	}

	async updateUser(id, { name, email, password }) {
		try {
			id = parseInt(id);
			return await this.prisma.users.update({
				where: { id },
				data: {
					name,
					email,
					password,
				},
			});
		} catch (err) {
			throw new Error(
				"Erreur lors de la mise à jour de l'utilisateur" + err.message
			);
		}
	}

	async deleteUser(id) {
		try {
			id = parseInt(id);
			return await this.prisma.users.delete({
				where: { id },
			});
		} catch (err) {
			throw new Error(
				"Erreur lors de la suppression de l'utilisateur" + err.message
			);
		}
	}
}

export default UserRepository;
