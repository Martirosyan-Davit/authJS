import userService from '../service/user_service.js'
import cookieParser from 'cookie-parser';

class UserController {
    async registrationUser(req, res) {
        try {
            const { token, user } = await userService.registration(req.body);
            res.cookie('refresh token', token.refreshToken, { httpOnly: true });
            res.json({
                token: token,
                user: user
            }).status(201);
        } catch (error) {
            res.status(error.status).json({ error: error.massage });
        }
    }

    async loginUser(req, res) {
        try {
            const token = await userService.loginUser(req.body);
            res.cookie('refresh token', token.refreshToken, { httpOnly: true });
            res.json(token).status(200);
        } catch (error) {
            res.status(error.status).json({ error: error.message });
        }
    }


    async getAllUsers(req, res) {
        try {
            const allUsers = await userService.usersGet(req.params.email)
            res.json(allUsers).status(200);
        } catch (error) {
            res.status(error.status).json({ error: error.message });
        }
    }

    async deleteUserByEmail(req, res) {
        try {
            const user = await userService.deleteUser(rep.params.email, rep.params.userEmail)
            res.json(user).status(200);
        } catch (error) {
            res.status(error.status).json({ error: error.message });
        }
    }

}

export default new UserController();