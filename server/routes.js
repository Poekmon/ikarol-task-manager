var express=require('express');
var router=express.Router();
var path=require('path');
var mongoose =require('mongoose');
//getting model
require('./db.model.js');
var Task=mongoose.model('Tasks');
// task collection
var taskCol=mongoose.connection.collection('task');
// get index page on given path
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/../client/app/index.html'));
});
// send task list data on given path
router.get('/home',function(req,res){
    Task.find().then(function(doc){
        res.json(doc);
    });
});
// send task list data on given path
router.get('/list',function(req,res){
    Task.find().then(function(doc){
        res.json(doc);
    });
});
//  insert sent task data to DB
router.post('/list',function(req,res){
    taskCol.insert(req.body,function(err,doc){
     res.json(doc);
   });
});
// delete sent task from DB
router.delete('/list/:id',function(req,res){
    Task.remove({_id: req.params.id},function(err,doc){
        res.json(doc);
    });
});
// update task's complete status
router.put('/list/:id',function(req,res){
    Task.findOneAndUpdate({_id: req.params.id},  
           {completed: req.body.completed},{new: true}
                    ,function(err,doc){
                        res.json(doc);
                     }
    );
});
// update task on sent data
router.put('/lists/:id',function(req,res){
    Task.findOneAndUpdate({_id: req.params.id},  
        {name: req.body.tempTask,isEditing: false,temTask: ''},
            {new: true},function(err,doc){
                            res.json(doc);
                        }
    );
});
//export routes
module.exports=router;
