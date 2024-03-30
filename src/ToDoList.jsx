import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel, faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const headers = ["Task", "Description", "Deadline", "Priority", "Is Complete", "Actions"];
    const [isEditMode, setIsEditMode] = useState(false);

    // Task Values
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("");
    let isComplete = false;
    const [isUpdateVisible, setIsUpdateVisible] = useState(Array(tasks.length).fill(true));
    let getIndex = 0;

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

    // Validate fields
    function validateFields() {
        let invalid = false;
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
        return invalid;
    }


    // Add a new task to the list
    function openAddPopup(event) {
        event.preventDefault();

        // Reset the task values
        setTask("");
        setDescription("");
        setDeadline("");
        setPriority("");
        isComplete = false;

        // Open the popup
        setIsEditMode(false);
        setAddPopupVisible(true);
    }

    function addTask() {
        // Validate Empty Fields
        let invalid = validateFields();

        if (task === "") {
            setIsTaskValid(false);
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
        setTasks([...tasks, {task, description, deadline, priority, isComplete}]);
        setIsUpdateVisible([...isUpdateVisible, true])

        // Show a success toast
        toast.success("Task added successfully!");

        // Close the popup
        setAddPopupVisible(false);
    }

    // Toggle the isComplete value of a task
    function toggleComplete(index) {
        setTasks(tasks.map((task, i) =>
            i === index ? {...task, isComplete: !task.isComplete} : task
        ));
        setIsUpdateVisible(isUpdateVisible.map((isVisible, i) =>
            i === index ? !isVisible : isVisible
        ));
    }

    // Edit a task
    function openUpdatePopup(event, index) {
        event.preventDefault();

        // Set the task values equal to the task being edited
        getIndex = index;
        setCurrentTask(tasks[index].task);
        setTask(tasks[index].task);
        setDescription(tasks[index].description);
        setDeadline(tasks[index].deadline);
        setPriority(tasks[index].priority);

        // Open the popup
        setIsEditMode(true);
        setUpdatePopupVisible(true);
    }

    function updateTask(event) {
        event.preventDefault();

        // Set the task values equal to the task being edited
        setCurrentTask(tasks[getIndex].task);
        setDescription(tasks[getIndex].description);
        setDeadline(tasks[getIndex].deadline);
        setPriority(tasks[getIndex].priority);

        // Validate Empty Fields
        if (validateFields()) {
            return;
        }

        // Update the task in the list
        let updatedTasks = tasks.copyWithin(0, tasks.length);
        updatedTasks[getIndex] = {task, description, deadline, priority, isComplete};
        setTasks(updatedTasks);

        // Show a success toast
        toast.success("Task updated successfully!");

        // Close the popup
        setUpdatePopupVisible(false);
    }

    // Delete a task
    function deleteTask(index) {
        // Delete the task from the list
        setTasks(tasks.filter((i) => i !== index));
        setIsUpdateVisible(isUpdateVisible.filter((i) => i !== index));

        // Show a success toast
        toast.success("Task deleted successfully!");
    }

    return (
        <div className="ToDoList">
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
                                <td>{new Date(t.deadline).toLocaleDateString('en-US')}</td>
                                <td>{t.priority}</td>
                                <td>
                                    <input type="checkbox" checked={t.isComplete}
                                           onChange={() => toggleComplete(index)}/>
                                </td>
                                <td>
                                    {isUpdateVisible[index] &&
                                        <button onClick={(e) => openUpdatePopup(e, index)}><FontAwesomeIcon
                                            icon={faPencil}/> Update</button>}
                                    <button className="button2" onClick={() => deleteTask(index)}><FontAwesomeIcon
                                        icon={faTrash}/> Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>
            </div>

            {/* Popups for Adding/Updating a task */}
            { (addPopupVisible || updatePopupVisible) && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>
                            {isEditMode ? <FontAwesomeIcon icon={faPencil}/> : <FontAwesomeIcon icon={faPlus}/>}
                            {isEditMode ? " Update Task" : " Add Task"}
                        </h2>

                        <form className="popup-fields">
                            {!isEditMode && (
                                <>
                                    <label>Task:</label>
                                    <input id="task-add-task" type="text" placeholder="Task" onChange={(e) => {
                                        setTask(e.target.value);
                                        setIsTaskValid(true);
                                    }} style={{borderColor: isTaskValid ? "" : "red"}}/>
                                    {!isTaskValid && <p style={{color: "red"}}>Task is required</p>}
                                    {!isTaskUnique && <p style={{color: "red"}}>Task must be unique</p>}
                                    <br/><br/>
                                </>)}

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
                            <input type="radio" name="priority" value="Low" checked={priority === "Low"}
                                   onChange={() => {
                                       setPriority("Low");
                                       setIsPriorityValid(true);
                                   }}/> Low<br/>
                            <input type="radio" name="priority" value="Med" checked={priority === "Med"}
                                   onChange={() => {
                                       setPriority("Med");
                                       setIsPriorityValid(true);
                                   }}/> Med<br/>
                            <input type="radio" name="priority" value="High" checked={priority === "High"}
                                   onChange={() => {
                                       setPriority("High");
                                       setIsPriorityValid(true);
                                   }}/> High<br/>
                            {!isPriorityValid && <p style={{color: "red"}}>Priority is required</p>}
                            <br/>

                            <br/>
                            <button type="button" onClick={isEditMode ? (e) => updateTask(e) : (e) => addTask(e)}>
                                {isEditMode ? <FontAwesomeIcon icon={faPencil}/> : <FontAwesomeIcon icon={faPlus}/>}
                                {isEditMode ? " Update Task" : " Add Task"}
                            </button>
                            <button type="submit" className="button2" onClick={() => {setAddPopupVisible(false); setUpdatePopupVisible(false);}}>
                                <FontAwesomeIcon icon={faCancel}/> Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer/>

        </div>);
}

export default ToDoList;