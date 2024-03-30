import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCancel, faPencil, faPlus} from "@fortawesome/free-solid-svg-icons";

function TaskDialog({
                        isEditMode,
                        setTask,
                        description,
                        setDescription,
                        deadline,
                        setDeadline,
                        priority,
                        setPriority,
                        isTaskValid,
                        setIsTaskValid,
                        isTaskUnique,
                        isDescriptionValid,
                        setIsDescriptionValid,
                        isDeadlineValid,
                        setIsDeadlineValid,
                        isPriorityValid,
                        setIsPriorityValid,
                        setAddPopupVisible,
                        setUpdatePopupVisible,
                        addTask,
                        updateTask
                    }) {

    return (
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
                    <input id="task-add-description" type="text" placeholder="Description" value={description}
                           onChange={(e) => {
                               setDescription(e.target.value);
                               setIsDescriptionValid(true);
                           }} style={{borderColor: isDescriptionValid ? "" : "red"}}/>
                    {!isDescriptionValid && <p style={{color: "red"}}>Description is required</p>}
                    <br/><br/>

                    <label>Deadline:</label>
                    <input id="task-add-deadline" type="date" value={deadline} onChange={(e) => {
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
                    <button type="submit" className="button2" onClick={() => {
                        setAddPopupVisible(false);
                        setUpdatePopupVisible(false);
                    }}>
                        <FontAwesomeIcon icon={faCancel}/> Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskDialog;