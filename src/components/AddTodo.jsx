import { useState } from "react"




function AddTodo({addNewTodo}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [timeEstimate, setTimeEstimate] = useState('')
    const [category, setCategory] = useState('')
    const [deadline, setDeadline] = useState('')
    const [status, setStatus] = useState('Not started yet')


    const handleSubmit = e => {
        console.log("Hej");
        e.preventDefault()
        addNewTodo({title, description, timeEstimate, category, deadline: new Date(deadline), status})


        setTitle('')
        setDescription('')
        setTimeEstimate('')
        setCategory('')
        setDeadline('')
        setStatus('Not started yet')


    }


    return(
        <>
        <form className="addTodo" onSubmit={handleSubmit}>
            <input type="text" className="todoInput" value={title} placeholder="Write your title" onChange={(e) =>(setTitle(e.target.value))}/>
            <input type="text" className="todoInput" value={description} placeholder="Descripe your task" onChange={(e) => (setDescription(e.target.value))}/>
            <input type="number" className="todoInput" value={timeEstimate} placeholder="Time Estimate" onChange={(e) =>(setTimeEstimate(e.target.value))}/>


            <select className="categoryInput" value={category} onChange={(e) => setCategory(e.target.value)}>
                 <option value="Household">Household</option>
                 <option value="Errands">Errands</option>
                 <option value="Shopping">Shopping</option>


                 </select>




                 <input type="date" className="todoInput" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>




            <select className="statusInput" value={status} onChange={(e) => setStatus(e.target.value)}>
                 <option value="Not started yet">Not started yet</option>
                 <option value="Completed">Completed</option>
                 </select>


            <br />
            <button type="submit" className="newTodoBtn">Add Task</button>
        </form>
        </>


    )
}


export default AddTodo   