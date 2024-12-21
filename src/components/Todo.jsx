import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenSquare } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns";


function Todo({task, deleteTodo, reDoTodo, changeStatus}) {
    return(
   <div className="todoList">
    <h4>{task.task.title}</h4>
    <h5>{task.task.description}</h5>
    <h5><span onClick={() => changeStatus(task.id)} style={{cursor: "pointer", color: task.task.status === "Completed" ? 'green' : 'red'}}>{task.task.status}</span></h5>
    <h5>Time Estimate: {task.task.timeEstimate}h</h5>
    <h5> Category: {task.task.category}</h5>
    <h5>Deadline: {format(task.task.deadline, "MM/dd/yyyy")}</h5>




    <div>
        <FontAwesomeIcon icon={faPenSquare} onClick={() => reDoTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)}/>
    </div>

   </div>
    )
}

export default Todo 