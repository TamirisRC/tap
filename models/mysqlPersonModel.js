class MysqlPersonModel {
    constructor(db) {
        this.db = db;
    }

    async createUser({ email, senha, nome, idade, sexo }) {
        const [result] = await this.db.execute(
            `INSERT INTO usuarios (email, senha, nome, idade, sexo) VALUES (?, ?, ?, ?, ?)`,
            [email, senha, nome, idade, sexo]
        );
        return result.insertId; 
    }

    async createAddress({ cep, logradouro, bairro, cidade, estado, usuario_id }) {
        await this.db.execute(
            `INSERT INTO enderecos (cep, logradouro, bairro, cidade, estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [cep, logradouro, bairro, cidade, estado, usuario_id]
        );
    }

}

export default MysqlPersonModel;