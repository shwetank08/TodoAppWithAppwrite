const express = require('express');
const Todo = require('../model/todo');

//create todo
exports.createTodo = async(req,res) => {
    try{
        const {task} = req.body;
        if(!task){
            return res.status(400).send("Please enter task!");
        }
        const newTask = await Todo.create({task});
        res.status(201).json({
            success: true,
            message: "Task added successfully",
            newTask
        })
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

//delete todo
exports.deleteTodo = async(req,res) => {
    try{
        const findTask = await Todo.findByIdAndDelete(req.params.id,req.body);

        res.status(201).json({
            success: true,
            message: "Task deleted successfully",
            findTask
        })
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
// read todo or get todo
exports.getTodo = async(req,res) => {
    try{
        const tasks = await Todo.find({});
        res.status(201).json({
            success: true,
            message: "Task added successfully",
            tasks
        })
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
// update todo
exports.updateTodo = async(req,res) => {
    try{
        const findTask = await Todo.findByIdAndUpdate(req.params.id,req.body);

        res.status(201).json({
            success: true,
            message: "Task updated successfully",
            findTask
        })
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}