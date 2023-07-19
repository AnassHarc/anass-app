const express = require('express');
const routers = express.Router();
const Authent = require('../middleware/auth');
//Company
const CompanyController = require('../Controller/Company_controller.js');
routers.get('/api/company',Authent,CompanyController.getAllCompanies);
routers.post('/api/addcompany',Authent,CompanyController.createCompany);
routers.put('/api/editcompany/:id',Authent,CompanyController.UpdateCompany);
routers.delete('/api/deletecompany/:id',Authent,CompanyController.deleteCompany);
//employee
const employeeController = require('../Controller/users_controller.js');
routers.get('/api/employees',Authent,employeeController.getAllEmployee);
routers.post('/api/addemployee',Authent,employeeController.CreateEmployee);
routers.put('/api/editemployee/:id',Authent,employeeController.UpdateEmployee);
routers.delete('/api/deletemployee/:id',Authent,employeeController.deleteEmployee);
//user
const user = require('../Controller/users_controller.js');
routers.post('/api/register',user.CreateUser);
routers.post('/api/login',user.UserLogin);
routers.get('/api/user',Authent,user.getUser);
//fileuploads
const fileUploading = require('../Controller/fileupload.js');
routers.post('/api/fileupload',fileUploading.EmployeeProfile);

module.exports = routers