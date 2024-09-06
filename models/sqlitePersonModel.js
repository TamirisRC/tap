class SqlitePersonModel {
    constructor(db) {
        this.db = db;
    }

    async createUser({ email, password, name, age, gender }) {
        const result = await this.db.run(
            `INSERT INTO usuarios (email, senha, nome, idade, sexo) VALUES (?, ?, ?, ?, ?)`,
            [email, password, name, age, gender]
        );
        return result.lastID; // Retorna o ID do usuário criado
    }

    async createAddress({ cep, address, neighborhood, city, state, usuario_id }) {
        await this.db.run(
            `INSERT INTO enderecos (cep, logradouro, bairro, cidade, estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [cep, address, neighborhood, city, state, usuario_id]
        );
    }

    // Outros métodos para buscar e manipular usuários e endereços
}

export default SqlitePersonModel;