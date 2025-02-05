import UserService from "../services/user.service.js";

class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async createUser(req, res) {
		const { id, name, email, password } = req.body;
		try {
			const newUser = await this.userService.createUser({
				id,
				name,
				email,
				password,
			});
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await this.userService.getUsers();
			res.status(200).json({ users });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async getUserById(req, res) {
		const { id } = req.params;
		try {
			const produit = await this.userService.getUserById(id);
			res.status(200).json({ produit });
		} catch (err) {
			res.status(404).json({ err: err.message });
		}
	}

	async updateUser(req, res) {
		const { id } = req.params;
		const { name, email, password } = req.body;
		try {
			const updatedUser = await this.userService.updateUser(id, {
				name,
				email,
				password,
			});
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async deleteUser(req, res) {
		const { id } = req.params;
		try {
			const result = await this.userService.deleteUser(id);
			res.status(200).json(result);
		} catch (err) {
			res.status(500).json({ err: err.message });
		}
	}
}

export default UserController;
