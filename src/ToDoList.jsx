import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Add a new task to the list


    return(
        <div className="ToDoList">Ï
            {/* Title */}
            <h1>To-Do List</h1>

            {/* Banner */}
            <div className="banner">
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
                <button onClick={() => setTasks([...tasks, newTask])}>Add Task</button>
            </div>

    </div>);
} export default ToDoList;