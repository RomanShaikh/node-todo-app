const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text : req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.send(err);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((doc)=>{
        res.send({
            doc,
            'code' : 'okk'
        });
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todo/:id',(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send({
            'message' : 'Invalid id'
        })
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send({
                'message' : 'No todo found with this id'
            });
        }
        res.status(200).send(todo);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

app.delete('/todo/:id',(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send({
            'message' : 'Invalid id'
        });
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            res.status(404).send({
                'message' : 'No todo found with this id'
            });
        }
        res.status(200).send(todo);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

app.listen(port,()=>{
    console.log(`Server up and lintening to port ${port}`);
});

