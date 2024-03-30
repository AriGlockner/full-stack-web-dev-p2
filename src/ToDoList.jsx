import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash, faBars} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskDialogue from "./TaskDialogue";
import moment from "moment";

function ToDoList() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const headers = ["Task", "Description", "Deadline", "Priority", "Is Complete", "Actions"];
    const [isEditMode, setIsEditMode] = useState(false);

    // Task Values
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("");
    let isComplete = false;
    const [isUpdateVisible, setIsUpdateVisible] = useState(Array(tasks.length).fill(true));
    const [getIndex, setGetIndex] = useState(0);

    // Task Validations
    const [currentTask, setCurrentTask] = useState(null);
    const [isTaskValid, setIsTaskValid] = useState(true);
    const [isTaskUnique, setIsTaskUnique] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isDeadlineValid, setIsDeadlineValid] = useState(true);
    const [isPriorityValid, setIsPriorityValid] = useState(true);

    // Popups Visibility
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [updatePopupVisible, setUpdatePopupVisible] = useState(false);

    // Update the local storage when tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
            toast.error("Please fill in all fields");
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
        setCurrentTask(tasks[index].task);
        setTask(tasks[index].task);
        setDescription(tasks[index].description);
        setDeadline(tasks[index].deadline);
        setPriority(tasks[index].priority);
        setGetIndex(index);

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
            toast.error("Please fill in all fields");
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
        setTasks(tasks.filter((_, i) => i !== index));
        setIsUpdateVisible(isUpdateVisible.filter((_, i) => i !== index));

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
                    <h2><FontAwesomeIcon icon={faBars}/> Frameworks
                    <button style={{float: 'right'}} className="add-button" onClick={openAddPopup}>
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
                                <td>{moment(t.deadline, 'YYYY-MM-DD').format('MM/DD/YYYY')}</td>
                                {/*<td>{new Date(t.deadline).toLocaleDateString('en-US')}</td>*/}
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
            {(addPopupVisible || updatePopupVisible) && (
                <TaskDialogue
                    // Edit Mode
                    isEditMode={isEditMode}

                    // Task Values
                    setTask={setTask}
                    description={description}
                    setDescription={setDescription}
                    deadline={deadline}
                    setDeadline={setDeadline}
                    priority={priority}
                    setPriority={setPriority}

                    // Task Validations
                    isTaskValid={isTaskValid}
                    setIsTaskValid={setIsTaskValid}
                    isTaskUnique={isTaskUnique}
                    isDescriptionValid={isDescriptionValid}
                    setIsDescriptionValid={setIsDescriptionValid}
                    isDeadlineValid={isDeadlineValid}
                    setIsDeadlineValid={setIsDeadlineValid}
                    isPriorityValid={isPriorityValid}
                    setIsPriorityValid={setIsPriorityValid}

                    // Popups Visibility
                    setAddPopupVisible={setAddPopupVisible}
                    setUpdatePopupVisible={setUpdatePopupVisible}

                    // Functions
                    addTask={addTask}
                    updateTask={updateTask}
                />
            )}

            <ToastContainer/>

        </div>);
}

export default ToDoList;