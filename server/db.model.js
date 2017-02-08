// db model
var mongoose=require('mongoose');
// schema for document's in 'task' collection
var taskSchema=new mongoose.Schema({
    severity : Number,
    name : String,
    completed : Boolean,
    isEditing : Boolean,
    tempTask : String
},{collection: 'task'});
// creating a model using schema created above
mongoose.model('Tasks',taskSchema);
