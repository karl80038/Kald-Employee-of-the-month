const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'employee.json');

const getEmployeeFromFile = (cb) => {
    fs.readFile(filePath, (error, fileContent) => {
        if(error){
           return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Employee {
    constructor(name, imgURL, achievement) {
        this.name = name;
        this.imgURL = imgURL;
        this.achievement = achievement;
    }

    save(existingEmployee){
        getEmployeeFromFile(employeeData => {
            if(existingEmployee != null)
            {
                const existingEmployeeIndex = employeeData.findIndex(employee => employee.name == existingEmployee);
                const updatedEmployee = [...employeeData];
                updatedEmployee[existingEmployeeIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedEmployee), (error) => {
                    console.log(error);
                });
            } 
            else 
            {
                employeeData.push(this);
                fs.writeFile(filePath, JSON.stringify(employeeData), (error) => {
                    console.log(error);
                });
            }

        });
    }

    static fetchAll(cb) 
    {
        getEmployeeFromFile(cb);
    }

    
    static getEmployeebyName(name,cb){
        getEmployeeFromFile(employeeData => {
            const employee = employeeData.find(e => e.name === name);
            cb(employee);
        })
    }

}
