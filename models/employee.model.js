const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'Required*'
    },
    email: {
        type: String,
        required: 'Required*'
    },
    mobile:{
        type: String
    },
    city:{
        type: String
    }
});

employeeSchema.path('email').validate((val) => {
    emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
}, 'Invalid Email');

mongoose.model('Employee', employeeSchema);