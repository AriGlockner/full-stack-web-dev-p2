import ToDoList from "./ToDoList";
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

function App() {
    return (<ToDoList></ToDoList>)
} export default App;