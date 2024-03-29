import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel, faPencil, faPlus, faPlust, faTrash} from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const headers = ["Task", "Description", "Deadline", "Priority", "Is Complete", "Actions"];

    // Task Values
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [actions, setActions] = useState(["Edit", "Delete"]);

    // Task Validations
    const [currentTask, setCurrentTask] = useState("");
    const [isTaskValid, setIsTaskValid] = useState(true);
    const [isTaskUnique, setIsTaskUnique] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isDeadlineValid, setIsDeadlineValid] = useState(true);
    const [isPriorityValid, setIsPriorityValid] = useState(true);

    // Popups Visibility
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [updatePopupVisible, setUpdatePopupVisible] = useState(false);

    // Add a new task to the list
    function openAddPopup(event) {
        event.preventDefault();

        // Reset the task values
        setTask("");
        setDescription("");
        setDeadline("");
        setPriority("");

        // Open the popup
        setAddPopupVisible(true);
    }

    function addTask() {
        // Validate Empty Fields
        let invalid = false;
        if (task === "") {
            setIsTaskValid(false);
            invalid = true;
        }
        if (description === "") {
            setIsDescriptionValid(false);
            invalid = true;
        }
        if (deadline === "") {
            setIsDeadlineValid(false);
            invalid = true;
        }
        if (priority === "") {
            setIsPriorityValid(false);
            invalid = true;
        }
        // Validate that the task is unique
        tasks.forEach(t => {
            if (t.task === task) {
                setIsTaskUnique(false);
                invalid = true;
            }
        });

        if (invalid) {
             return;
        }


        // Add the task to the list
        setTasks([...tasks, {task, description, deadline, priority, isComplete, actions}]);

        // Close the popup
        setAddPopupVisible(false);
    }

    // Toggle the isComplete value of a task
    function toggleComplete(index) {
        setTasks(tasks.map((task, i) =>
            i === index ? {...task, isComplete: !task.isComplete} : task
        ));
    }

    // Edit a task
    function openUpdatePopup(event, index) {
        event.preventDefault();

        // Set the task values equal to the task being edited
        setCurrentTask(tasks[index].task);
        setTask(tasks[index].task);
        setDescription(tasks[index].description);
        setDeadline(tasks[index].deadline);
        setPriority(tasks[index].priority);

        // Open the popup
        setUpdatePopupVisible(true);
    }

    // Delete a task
    function deleteTask(index) {
        setTasks(tasks.filter((task, i) => i !== index));
    }

    return (
        <div className="ToDoList">Ï
            {/* Title */}
            <div className="title">
                <h1>To-Do List</h1>
            </div>

            {/* Banner */}
            <div className="banner">
                <span style={{textAlign: 'center'}}>
                    <h2>Frameworks<button style={{float: 'right'}} className="add-button" onClick={openAddPopup}>
                        <FontAwesomeIcon icon={faPlus}/> Add Task</button></h2>
                </span>
            </div>

            {/* Table of Tasks */}
            <div className="table to-do-list">
                <table>
                    <thead>
                    <tr>
                        {headers.map(header => <th>{header}</th>)}
                    </tr>
                    </thead>

                    <tbody>
                    {tasks.map((t, index) => {
                        return (
                            <tr key={index}>
                                <td>{t.task}</td>
                                <td>{t.description}</td>
                                <td>{t.deadline}</td>
                                <td>{t.priority}</td>
                                <td>
                                    <input type="checkbox" checked={t.isComplete}
                                           onChange={() => toggleComplete(index)}/>
                                </td>
                                <td>
                                    <button onClick={(e) => openUpdatePopup(e, index)}><FontAwesomeIcon icon={faPencil}/> Update</button>
                                    <button onClick={() => deleteTask(index)}><FontAwesomeIcon icon={faTrash}/> Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
            </div>

            {/* Add Task Popup */}
            {addPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add Task</h2>
                        <form className="popup-fields">

                            <label>Task:</label>
                            <input id="task-add-task" type="text" placeholder="Task" onChange={(e) => {
                                setTask(e.target.value);
                                setIsTaskValid(true);
                            }} style={{borderColor: isTaskValid ? "" : "red"}}/>
                            {!isTaskValid && <p style={{color: "red"}}>Task is required</p>}
                            {!isTaskUnique && <p style={{color: "red"}}>Task must be unique</p>}
                            <br/><br/>

                            <label>Description:</label>
                            <input id="task-add-description" type="text" placeholder="Description" onChange={(e) => {
                                setDescription(e.target.value);
                                setIsDescriptionValid(true);
                            }} style={{borderColor: isDescriptionValid ? "" : "red"}}/>
                            {!isDescriptionValid && <p style={{color: "red"}}>Description is required</p>}
                            <br/><br/>

                            <label>Deadline:</label>
                            <input id="task-add-deadline" type="date" onChange={(e) => {
                                setDeadline(e.target.value);
                                setIsDeadlineValid(true);
                            }} style={{borderColor: isDeadlineValid ? "" : "red"}}/>
                            {!isDeadlineValid && <p style={{color: "red"}}>Deadline is required</p>}
                            <br/><br/>

                            <label>Priority:</label>
                            <input type="radio" name="priority" value="Low" onChange={() => {
                                setPriority("Low");
                                setIsPriorityValid(true);
                            }}/> Low<br/>
                            <input type="radio" name="priority" value="Med" onChange={() => {
                                setPriority("Med");
                                setIsPriorityValid(true);
                            }}/> Med<br/>
                            <input type="radio" name="priority" value="High" onChange={() => {
                                setPriority("High");
                                setIsPriorityValid(true);
                            }}/> High<br/>
                            {!isPriorityValid && <p style={{color: "red"}}>Priority is required</p>}
                            <br/>

                            <br/>
                            <button type="button" onClick={(e) => addTask(e)}><FontAwesomeIcon icon={faPlus}/> Add Task
                            </button>
                            <button type="submit" className="button2" onClick={() => setAddPopupVisible(false)}>
                                <FontAwesomeIcon icon={faCancel}/> Cancel
                            </button>
                        </form>
                    </div>
                </div>)}

            {/* Update Task Popup */}
            {updatePopupVisible && (<div className="popup">
                <div className="popup-content">
                    <h2>Update Task: {currentTask}</h2>
                    <form className="popup-fields">
                        <label>Description:</label>
                        <input id="task-update-description" type="text" placeholder="Description" value={description}
                               onChange={(e) => setDescription(e.target.value)} style={{borderColor: isDescriptionValid ? "" : "red"}}/>
                        {!isDescriptionValid && <p style={{color: "red"}}>Description is required</p>}
                        <br/><br/>

                        <label>Deadline:</label>
                        <input id="task-update-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                               style={{borderColor: isDeadlineValid ? "" : "red"}}/>
                        {!isDeadlineValid && <p style={{color: "red"}}>Deadline is required</p>}
                        <br/><br/>

                        <label>Priority:</label>
                        <input type="radio" name="priority" value="Low" onChange={() => {
                            setPriority("Low");
                            setIsPriorityValid(true);
                        }}/> Low<br/>
                        <input type="radio" name="priority" value="Med" onChange={() => {
                            setPriority("Med");
                            setIsPriorityValid(true);
                        }}/> Med<br/>
                        <input type="radio" name="priority" value="High" onChange={() => {
                            setPriority("High");
                            setIsPriorityValid(true);
                        }}/> High<br/>
                        {!isPriorityValid && <p style={{color: "red"}}>Priority is required</p>}

                        <br/>
                        <button type="button" onClick={(e) => addTask(e)}><FontAwesomeIcon icon={faPencil}/> Update Task</button>
                        <button type="submit" className="button2" onClick={() => setUpdatePopupVisible(false)}><FontAwesomeIcon icon={faCancel}/> Cancel</button>
                    </form>
                </div>
                </div>)}

        </div>);
}

export default ToDoList;