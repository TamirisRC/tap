import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';


export const generateToken = (user) => {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};


export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 8);
};


export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};