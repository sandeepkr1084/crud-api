const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=> {
    if(!err){
        console.log('MongoDB connected successfully!!');
    }
    else{
        console.log('Error in DB connection : ', + err);
    }
});
require('./employee.model');