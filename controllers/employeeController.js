const Employee = require('../models/employee');


exports.getAddEmployee = (req, res) =>{
    // res.render('admin/add-product.ejs', {
    Employee.fetchAll(employee => {

        if (employee.length <= 0)
        {
            res.render('employeeEditor.ejs', {    
                pageTitle: 'Add Employee',
                path: '/add-employee',
                editing: false
            });
        }
        else
        {
            res.redirect('/');
        }    
    });
};

exports.postAddEmployee = (req, res) => {
    if (req.body.empName.length > 0 & req.body.empAchievement.length > 0)
    {
        const employee = new Employee(req.body.empName, req.body.empImg, req.body.empAchievement);
        employee.save(null);
        res.redirect('/');
    }
};
exports.getEditEmployee = (req,res) => {
    const editMode = req.query.edit;
    const eName = req.params.oldName;
    Employee.getEmployeebyName(eName, employee => {
        if (!employee)
        {
            return res.redirect('/');
        }
            // res.render('admin/add-product.ejs', {
        res.render('employeeEditor.ejs', {    
            pageTitle: 'Edit Employee',
            path: '/edit-employee',
            editing: editMode,
            emp: employee
        });
    });
};

exports.postEditEmployee = (req, res) => {
    const previousEmployee = req.body.oldName;
    if (req.body.empName.length > 0 & req.body.empAchievement.length > 0)
    {
        const employee = new Employee(req.body.empName, req.body.empImg, req.body.empAchievement);
        employee.save(previousEmployee);
        res.redirect('/');
    }
};

exports.getEmployeeOfTheMonth = (req, res) => {
    Employee.fetchAll(employee => {
        if (employee.length > 0)
        {
            res.render('mainpage.ejs', {
                employee: employee,
                pageTitle: 'Employee of the month',
                path: '/m'
            });
        }
        else 
        {
            res.render('employeeEditor.ejs', {    
                pageTitle: 'Add Employee',
                path: '/add-employee',
                editing: false
            }); 
        }

    });
};