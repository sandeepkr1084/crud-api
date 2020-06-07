const express = require('express');
var router = express.Router();
var handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});
router.post('/', (req, res)=>{
    if(req.body._id=='')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});
function updateRecord(req, res){
    Employee.findOneAndUpdate({_id:req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(!err){res.redirect('employee/list');}
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit",{
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else{
                console.log("Error to insert : "+ err);
            }
        }
    })
}
function insertRecord(req, res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if(!err)
            res.redirect('employee/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else{ 
                console.log('Error to insert : '+ err);
            }
        }
    })
}
router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.render("employee/list", {
                list: docs.map((doc)=>{
                    return {
                        _id: doc._id,
                        fullName: doc.fullName,
                        email: doc.email,
                        mobile: doc.mobile,
                        city: doc.city,
                    }
                })
            });
        }
        else{
            console.log('Error in retrieving data : ' + err);
        }
    })
});

function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName': body['fullNameError'] = err.errors[field].message;
                            break;
            case 'email': body['emailError'] = err.errors[field].message;
                            break;
            default: break;
        }
    }
}
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("employee/addOrEdit", {
                viewTitle: 'Update Detail',
                employee: doc
            })
        }
    })
})
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log('Error in delete : ', err);
        }
    })
})
module.exports = router;