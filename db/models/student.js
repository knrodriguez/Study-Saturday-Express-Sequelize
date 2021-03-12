const Sequelize = require('sequelize');
const db = require('../db');

//allowNull and validate is found in Validations & Constraints
const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false //constraint (checked by SQL)
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false //constraint (checked by SQL)
    },    
    email: {
        type: Sequelize.STRING,
        allowNull: false, //constraint
        validate: { //validation (checked by Sequelize before heading to the DB)
            isEmail: true
        }
    }
});

//found in Hooks -> Declaring Hooks (Method 3)
Student.beforeCreate((student) => {
    let firstName = student.firstName;
    let lastName = student.lastName;
    firstName = firstName.slice(0,1).toUpperCase() + firstName.slice(1);
    lastName = lastName.slice(0,1).toUpperCase() + lastName.slice(1);
    student.firstName = firstName;
    student.lastName = lastName;

    //  DRYer method
    // let names = [student.firstName, student.lastName]
    //             .map(name => name.slice(0,1).toUpperCase() + name.slice(1));
    // student.firstName = names[0];
    // student.lastName = names[1];
    
})

module.exports = Student;
