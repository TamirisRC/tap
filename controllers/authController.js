import { generateToken, hashPassword, comparePassword } from '../config/auth.js';
import DatabaseFactory from '../config/databaseFactory.js';

const userDatabase = DatabaseFactory.createDatabase();

class AuthController {
    async register(req, res) {
        const {
            email,
            senha,
            nome,
            idade,
            sexo,
            dadosEndereco
        } = req.body;

        const existingUser = await userDatabase.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Usuário já existe' });
        }

        const hashedPassword = hashPassword(senha);

        const userId = await userDatabase.createUser({
            email,
            senha: hashedPassword,
            nome,
            idade,
            sexo
        });


        await userDatabase.createAddress({
            ...dadosEndereco,
            usuario_id: userId
        });

        return res.json({ success: true });
    }

    async login(req, res) {
        const { email, senha } = req.body;


        const user = await userDatabase.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Usuário não encontrado' });
        }


        const isPasswordValid = comparePassword(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Senha inválida' });
        }


        const token = generateToken(user.id);
        return res.json({ token });
    }
}

export default new AuthController();