import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwtToken from '../utils/jwtHelper.js';

let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


class UserService {
    async registration(payload) {
        const { name, password, email, admin } = payload;
        if (!regex.test(email)) {
            throw new Error({ massage: 'Email is incorrect', status: 422 });
        }
        // CREATE USER 
        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = await pool.query(
            `INSERT INTO users (name, email, password, admin) values ($1, $2, $3, $4) RETURNING *`,
            [name, email, hashedPassword, admin]);

        let token = jwtToken({ user_id: newUser.rows[0].id, user_name: newUser.rows[0].name, user_email: newUser.rows[0].email });
        // res.cookie('refresh token', token.refreshToken, { httpOnly: true });
        return { token: token, user: newUser };
    };

    async login(payload) {

        const { email, password } = payload;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
        if (user.rows.length === 0) throw new Error({ message: 'Invalid password or email', status: 401 })
        // PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) throw new Error({ message: 'Invalid password or email', status: 401 })
        // JWT 
        let token = jwtToken({ user_id: newUser.rows[0], user_name: newUser.rows[0].name, user_email: newUser.rows[0].email });
        // res.cookie('refresh token', token.refreshToken, { httpOnly: true });
        // res.json(token)
        return token;
    };

    async usersGet(payload) {
        const email = payload;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!user.rows[0]) throw new Error({ massage: 'Email is incorrect. User not found', status: 401 });
        if (user.rows[0].admin === false) throw new Error({ massage: 'you can not get users', status: 405 });
        // GET ALL USERS
        const users = await pool.query(`SELECT * FROM users`)
        if (!users.rows[0]) throw new Error({ massage: 'Users not found', status: 404 })

        return users.rows;

    };

    async deleteUser(email, userEmail) {
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!user.rows[0]) throw new Error({ massage: 'Email is incorrect. admin not found', status: 401 });
        if (!user.rows[0].admin) throw new Error({ massage: 'you can not delete users', status: 405 });
        const dltUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [userEmail]);
        if (!dltUser.rows[0]) throw new Error({ massage: 'Email is incorrect. User not found', status: 401 });
        if (user.rows[0].admin) throw new Error({ massage: 'You can not delete admin', status: 405 });
        // DELETE USER
        await pool.query(`DELETE * FROM users WHERE email = $1`, [email]);

        return dltUser.rows[0];

    }
}







export default new UserService();

