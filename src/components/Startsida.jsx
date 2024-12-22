
import { useNavigate } from "react-router-dom" 


function Startsida({habits, todos = [], events}) {

    const navigation = useNavigate()

    const sshabits = [...habits]
    .sort((a,b) => b.rep - a.rep)

    const sstodos = [...todos].filter((todo) => todo.task.status !== "Completed").sort((a, b) => new Date(b.task.deadline) - new Date(a.task.deadline)) 
        .slice(0, 3); 

        const sortedEvents = [...events].sort((a, b) => {
            const eventTimeA = new Date(`${a.endDate}T${a.endTime}`).getTime();
            const eventTimeB = new Date(`${b.endDate}T${b.endTime}`).getTime();
            return eventTimeA - eventTimeB;
        });

    return(
        <>

        <h1>STARTSIDA</h1>

    <div style={{display:"flex", justifyContent:"center"}}>
    
        <div className="Rutiner" style={{border:"solid 2px #ff6f91", width:"150px", padding:"20px", margin:"20px", boxShadow: "3px 6px 8px rgba(0, 0, 0, 0.1)",
             background: "linear-gradient(145deg, #ffefd5, #fff5e1)"}}>
            <h2 style={{fontFamily:"fantasy", color:"pink", 
                textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>
                    RUTINER</h2>

            {sshabits.slice(0,3).map((habit, i) => <p key = {i}>

                <h5 style={{color:"#080623"}}>
                    <h2 style={{fontFamily:"fantasy", color:"pink", 
                textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>{habit.title}</h2>
                    Prio: {habit.priority}
                    <br></br>
                    Repetitioner: {habit.rep}
                </h5>
            </p>
            )}

            <button style={{margin:"20px", padding: "10px 20px", background: "linear-gradient(145deg, #ff6f91, #ff93e2)",
                border: "solid 2px #ff6f91", color: "white", fontFamily: "fantasy", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease-in-out"
              }} onClick={() => navigation("/habits")}>Gå till Rutiner</button>
        
        </div>
            <br></br>
            <div className="Event" style={{ border: "solid 2px  #ff6f91", width: "150px", padding: "20px", margin: "20px", boxShadow: "3px 6px 8px rgba(0, 0, 0, 0.1)",
                background: "linear-gradient(145deg, #ffefd5, #fff5e1)"
             }}>
                    <h2 style={{ fontFamily: "fantasy", color: "pink", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>
                        HÄNDELSER
                    </h2>
                    {sortedEvents.slice(0, 3).map((event, i) => (
                        <div key={i}>
                            <h5>
                                <h2 style={{ fontFamily: "fantasy", color: "pink", textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>
                                    {event.name}
                                </h2>
                                Start: {event.startDate} {event.startTime}
                                <br />
                                Slut: {event.endDate} {event.endTime}
                            </h5>
                        </div>
                    ))}
                    <button style={{margin:"20px", padding: "10px 20px", background: "linear-gradient(145deg, #ff6f91, #ff93e2)",
                border: "solid 2px #ff6f91", color: "white", fontFamily: "fantasy", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease-in-out"
              }} onClick={() => navigation("/Events")}> Lägg till händelse</button>
                </div>
            <br></br>


            <div className="Todo" style={{ border: "solid 2px  #ff6f91", width: "150px", padding: "20px", margin: "20px", boxShadow: "3px 6px 8px rgba(0, 0, 0, 0.1)",
                background: "linear-gradient(145deg, #ffefd5, #fff5e1)"
            }}>
    <h2
        style={{
            fontFamily: "fantasy",
            color: "pink",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
        }}
    >
        ATT GÖRA
    </h2>

    {sstodos.length === 0 ? (
        <p>Inga Todos än! Lägg till några för att komma igång :D</p> 
    ) : (
        <ul>
            {sstodos.map((todo, i) => (
                <li key={i}>
                    <h5 style={{ color: "#080623" }}>
                        <h3
                            style={{
                                fontFamily: "fantasy",
                                color: "pink",
                                textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                            }}
                        >
                            {todo.task.title}
                        </h3>
                        {todo.task.description && <p>{todo.task.description}</p>}
                        Deadline: {new Date(todo.task.deadline).toLocaleDateString()}
                    </h5>
                </li>
            ))}
        </ul>
    )}


    <button style={{margin:"20px", padding: "10px 20px", background: "linear-gradient(145deg, #ff6f91, #ff93e2)",
                border: "solid 2px #ff6f91", color: "white", fontFamily: "fantasy", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease-in-out"
              }} onClick={() => navigation("/TodoWrapper")}>Lägg till Todo</button>
</div>


       
    </div>

        
        </>
    )
}

export default Startsida