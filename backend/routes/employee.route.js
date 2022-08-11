const express = require('express');
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employee.controller');
const employeeRoute = express.Router();

employeeRoute.post('/create', createEmployee);

employeeRoute.get('/', getEmployees);

employeeRoute.get('/:id', getEmployeeById);

employeeRoute.put('/update/:id', updateEmployee);

employeeRoute.delete('/delete/:id', deleteEmployee);

module.exports = employeeRoute;