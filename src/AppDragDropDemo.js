import React, { Component } from "react";
import "./App.css";

export default class AppDragDropDemo extends Component {
    // array of taks belonging to a category
    state = {
        tasks: [
            {name: "Angular", category: "wip", bgcolor: "yellow"},
            {name: "React", category: "wip", bgcolor: "pink"},
            {name: "Vue", category: "complete", bgcolor: "skyblue"}
        ]
    }

    // onDragStart get the id of a specific task
    // storing the id in the dataTransfer object, 
    // this persists the information from the drag and drop scenario
    onDragStart = (ev, id) => {
        console.log("dragStart: ", id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    // we grab the id from the dragStart event
    // loop through all the tasks
    // if the task matches the id
    // change the category to the new category -> cat
    // finally update the state
    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) =>{
            if (task.name == id) {
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render() {
        // create array to categorise tasks into different categories
        let tasks = {
            wip: [],
            complete: []
        }
        
        // get all the tasks
        // for every task, store task into respective catgory
        // in this case using a div element, can use <ul>, anything you prefer
        // to make any element draggable, you need to use the 'draggable' attribute
        // need to get the id / unique value of the element to track which element is being dragged
        this.state.tasks.forEach((t) => {
            tasks[t.category].push(
                <div key={t.name}
                    onDragStart={(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: t.bgcolor }}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <h2 className="header">Drag and drop demo</h2>
                <div className="wip" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "wip")}>
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                <div className="droppable" 
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")}>
                    <span className="task-header">Completed</span>
                    {tasks.complete}
                </div>
            </div>
        );
    }
}