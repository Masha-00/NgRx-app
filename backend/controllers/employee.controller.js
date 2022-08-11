const Employee = require('../models/Employee.model');
const CustomError = require('../errors');

exports.createEmployee = async(req, res, next) => {
  try {
    const { name, email, phoneNumber, level, date } = req.body;
    let employee = await Employee.findOne({ email });
    if (employee) {
      throw new CustomError().badRequest('Employee already exists');
    }
    employee = new Employee({ name, email, phoneNumber, level, date });
    return res.status(201).json(await employee.save());
  } catch (err) {
    return next(err);
  }
};

exports.getEmployees = async(req, res, next) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (err) {
    return next(err);
  }
};

exports.getEmployeeById = async(req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      throw new CustomError().notFound('Employee not found');
    }
    return res.status(200).json(employee);
  } catch (err) {
    return next(err);
  }
};

exports.updateEmployee = async(req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      throw new CustomError().notFound('Employee not found');
    }
    const updateEmployee = await
    Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    return res.status(200).json(updateEmployee);
  } catch (err) {
    return next(err);
  }
};

exports.deleteEmployee = async(req, res, next) => {
  try {
    const deleteEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deleteEmployee) {
      throw new CustomError().notFound('Employee not found');
    }
    return res.status(200).json(deleteEmployee);
  } catch (err) {
    return next(err);
  }
}