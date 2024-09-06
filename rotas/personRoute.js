import express from 'express';
import PersonController from '../controllers/personController.js';

class PersonRoute {
    constructor(database) {
        this.router = express.Router();
        this.controller = new PersonController(database);
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/pessoa', (req, res) => this.controller.createPerson(req, res));
        this.router.get('/pessoa/:id', (req, res) => this.controller.getPerson(req, res));
        this.router.put('/pessoa/:id', (req, res) => this.controller.updatePerson(req, res));
        this.router.delete('/pessoa/:id', (req, res) => this.controller.deletePerson(req, res));
    }
}

export default PersonRoute;