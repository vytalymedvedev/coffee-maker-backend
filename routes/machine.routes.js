const Router = require('express');
const router = new Router();
const machineController = require('../controller/machine.controller');

router.post('/machines', machineController.createMachine);

router.get('/machines', machineController.getMachines);

router.patch('/machines/:id', machineController.updateMachine);

router.delete('/machines/:id', machineController.deleteMachine);


module.exports = router;