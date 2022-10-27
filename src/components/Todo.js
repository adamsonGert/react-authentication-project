import React, { useState } from 'react'
import '../style.css'
import { InputGroup, FormControl } from 'react-bootstrap'
import { CheckSquare, Save, XSquare } from 'react-bootstrap-icons';

export default function Todo({
    todo,
    toggleComplete,
    handleDelete,
    handleEdit,
}) {
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleChange = (e) => {
        e.preventDefault();
        if (todo.complete === true) {
            setNewTitle(todo.title);
        } else {
            todo.title = "";
            setNewTitle(e.target.value);
        }
    };

    return (
        <>
        <div className="todo-item mb-3">
        <InputGroup>
            <FormControl
            style={{textDecoration: todo.completed && "line-through" }}
            value={todo.title === "" ? newTitle : todo.title}
            className="list"
            onChange={handleChange}
            />
            <InputGroup.Text id="basic-addon2" style={{ backgroundColor: 'white'}}>
            <CheckSquare className='button-complete svgStyle' onClick={() => toggleComplete(todo)} color="green" size={24} />
            <Save className='button-edit svgStyle mr-2 ml-2' onClick={() => handleEdit(todo, newTitle)} color="black" size={24} />
            <XSquare className='button-delete svgStyle' onClick={() => handleDelete(todo.id)} color="red" size={24} />
            </InputGroup.Text>
        </InputGroup>
        </div>
    </>
    );
}
