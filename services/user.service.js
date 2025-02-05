import UserRepository from "../repositories/user.repository.js";

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async createUser({ id, name, email, password }) {
		try {
			return await this.userRepository.createUser({
				id,
				name,
				email,
				password,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getUsers() {
		try {
			return await this.userRepository.getUsers();
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getUserById(id) {
		try {
			return await this.userRepository.getUserById(id);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async updateUser(id, { name, email, password }) {
		try {
			const updatedUser = await this.userRepository(id, {
				name,
				email,
				password,
			});
			if (!updatedUser) {
				throw new Error("Utilisateur introuvable");
			}
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async deleteUser(id) {
		try {
			const deletedUser = await this.userRepository.deleteUser(id);
			if (!deletedUser) {
				throw new Error("User introuvable");
			}
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default UserService;
