import { useNavigate } from "react-router-dom";
import { useState } from "react";


function NewHabit({addHabit, newHabitId}) {


    let [title, setTitle] = useState("")
    let [priority, setPriority] = useState("")
    let [rep, setRep] = useState("")
    let [userId, setUserId] = useState(() => newHabitId())


    let nav = useNavigate()


    const handleAddHabit = () => {
       
        if (!title || !priority || !rep ) {
            alert("STOP! Alla fält måste vara ifyllda för att lägga till ny rutin!");
            return;
        }


        addHabit({
            title,
            priority,
            rep,
            userId,
        });


        nav("/habits");
    };


    return(
        <>
        <h2>Ny Rutin</h2>


    <input type="text" placeholder="Titel"
     onChange= {e => setTitle(e.target.value)}/>
     <br/>
     <label for="prio" style={{backgroundColor:"white", color:"grey", border:"solid 1px"}}>Välj prioritet: </label>
      <select id="prio" style={{width:"79px"}} onChange={(e) => setPriority(e.target.value)} value={priority}>
       <option value="">Välj </option>
       <option value="låg">låg</option>
       <option value="medel">medel</option>
       <option value="hög">hög</option>
      </select>
    <br/>
    <input type="number" placeholder="Repetitioner"
    onChange= {e => setRep(e.target.value)}/>
   
     <br/>
     <button style={{margin:"10px"}} onClick={handleAddHabit}>Lägg till Rutin</button>        
      <br></br>
      <button style={{color:"gray", fontSize:"small"}} onClick={() => nav(-1)}>Avbryt</button>
        </>
    )
     }


export default NewHabit
