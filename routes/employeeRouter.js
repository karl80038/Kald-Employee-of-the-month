const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
//mini express app pluggable to another express app

router.get('/', employeeController.getEmployeeOfTheMonth);
router.get('/add-employee', employeeController.getAddEmployee);
router.post('/add-employee', employeeController.postAddEmployee);
router.get('/edit-employee/:oldName', employeeController.getEditEmployee);
router.post('/edit-employee', employeeController.postEditEmployee);

module.exports = router;