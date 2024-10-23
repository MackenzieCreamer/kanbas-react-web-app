import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem( { todo } : {todo : any} ) {
    const dispatch = useDispatch();
    return (
      <li key={todo.id} className="list-group-item">
        <button onClick={() => dispatch(deleteTodo(todo.id))} className="btn float-end bg-danger ms-2 text-white"
                id="wd-delete-todo-click"> Delete </button>
        <button onClick={() => dispatch(setTodo(todo))} className="btn float-end bg-primary text-white"
                id="wd-set-todo-click"> Edit </button>
        {todo.title}    </li>);}
