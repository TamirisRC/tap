class PersonController {
    constructor(database) {
        this.db = database.getConnection();
        this.personModel = this.createPersonModel(database);
    }

    createPersonModel(database) {
        switch (database.constructor.name) {
            case 'SqliteDatabase':
                return new SqlitePersonModel(database.getConnection());
            case 'MysqlDatabase':
                return new MysqlPersonModel(database.getConnection());
            default:
                throw new Error("Unsupported database type");
        }
    }

    async createPerson(req, res) {
        const { nome, idade, sexo, endereco } = req.body;

        if (!nome || !idade || !sexo || !endereco) {
            return res.status(400).json({ message: "Dados incompletos" });
        }

        try {
            const result = await this.personModel.createPerson(nome, idade, sexo, endereco);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ status: false, message: `Erro ao criar pessoa: ${error.message}` });
        }
    }

    async getPerson(req, res) {
        const { id } = req.params;

        try {
            const result = await this.personModel.getPerson(id);
            if (result) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: "Pessoa não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: `Erro ao obter pessoa: ${error.message}` });
        }
    }

    async updatePerson(req, res) {
        const { id } = req.params;
        const { nome, idade, sexo, endereco } = req.body;

        try {
            const result = await this.personModel.updatePerson(id, nome, idade, sexo, endereco);
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Pessoa atualizada com sucesso" });
            } else {
                return res.status(404).json({ message: "Pessoa não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: `Erro ao atualizar pessoa: ${error.message}` });
        }
    }

    async deletePerson(req, res) {
        const { id } = req.params;

        try {
            const result = await this.personModel.deletePerson(id);
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Pessoa deletada com sucesso" });
            } else {
                return res.status(404).json({ message: "Pessoa não encontrada" });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: `Erro ao deletar pessoa: ${error.message}` });
        }
    }
}

export default PersonController;