import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
      <li className="list-group-item d-flex">
        <button onClick={() => dispatch(addTodo(todo))} className="order-2 ms-2 btn bg-success text-white"
                id="wd-add-todo-click"> Add </button>
        <button onClick={() => dispatch(updateTodo(todo))} className="order-1 ms-2 btn bg-warning"
                id="wd-update-todo-click"> Update </button>
        <input defaultValue={todo.title} className="form-control flex-grow-1 order-0"
          onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
      </li>
  );}
