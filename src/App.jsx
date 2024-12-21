import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Habitsx from './components/Habitsx';
import NewHabit from './components/NewHabit';
import Navigation from './components/Navigation';
import Events from './components/Events';
import TodoWrapper from './components/TodoWrapper';
import Login from './components/Login';
import Registrera from './components/Registrera';
import Quote from './components/Quote';
import { v4 as uuidv4 } from 'uuid';
import Startsida from './components/Startsida';
import AddEvent from './components/AddEvent';
import { useLocation } from 'react-router-dom';
import EventItem from './components/EventItem';


function App() { 
  const navigate = useNavigate()
  const location = useLocation()

      const [name, setName] = useState("");
      const [startTime, setStartTime] = useState("");
      const [endTime, setEndTime] = useState("");
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [isEditing, setIsEditing] = useState(false);
      const [editedEvent, setEditedEvent] =useState ("");
      const [filterMode, setFilterMode] = useState("all")


      function addEvent(e) {
       
        e.preventDefault();
   
        const id = new Date().getTime();
        const userId = currentUser ? currentUser.userId: null;


        if (name && startTime && endTime && startDate && endDate) {
            const newEvent = { id, name, startTime, endTime, startDate, endDate, userId };
   
            setEvents((prevEvents) => {
                const updatedEvents = [...prevEvents, newEvent];
                localStorage.setItem("events", JSON.stringify(updatedEvents));
                return updatedEvents;
            });
   
            setName("");
            setStartTime("");
            setEndTime("");
            setStartDate("");
            setEndDate("");
        } else {
            alert("Fyll i alla fält!");
        }
    }
   


    function deleteEvent (eventToDelete){
       
        setEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.id !== eventToDelete.id)
        localStorage.setItem("events", JSON.stringify(updatedEvents))
        return (updatedEvents)
        })
    }


    function handleEditEvent(eventItem) {
        setIsEditing(true);
        setEditedEvent(eventItem);
        setName(eventItem.name);
        setStartTime(eventItem.startTime);
        setStartDate(eventItem.startDate);
        setEndTime(eventItem.endTime);
        setEndDate(eventItem.endDate);
    }
   


    function updateEvent(e) {
        e.preventDefault();
   
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id === editedEvent.id
                    ? { ...event, name, startTime, startDate, endTime, endDate }
                    : event
            );
   
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            return updatedEvents;
        });
   
        setIsEditing(false);
        setEditedEvent(null);
        setName("");
        setStartTime("");
        setStartDate("");
        setEndTime("");
        setEndDate("");
    }


    function toggleFilter() {
        if (filterMode === "all") {
            setFilterMode("upcoming")
        } else if (filterMode === "upcoming") {
            setFilterMode("past")
        } else {
            setFilterMode("all")
        }
    }


  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user))
    navigate("/start");
};

const handleLogout = () => {
  setCurrentUser(null);
  localStorage.removeItem("currentUser");
  navigate("/");
};

  const [currentUser, setCurrentUser] = useState(null);


  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        setCurrentUser(JSON.parse(storedUser)); 
    }
}, []);



  const addNewTodo = (todo) => {

    if (!currentUser) {
      alert("You need to sign in first!");
      return;
  }
      const {title, description, timeEstimate, category, deadline, status} = todo
      const parsedDeadline = new Date(deadline)
      const newTodo = {id: uuidv4(), userId: currentUser.userId, task: {title, description, timeEstimate, category, deadline: parsedDeadline, status},
        completed: false,
        isEditing: false
      }
    
      setTodos([...todos, newTodo])
      
  }


  const changeStatus = id => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, task: { ...todo.task, status: todo.task.status === "Completed" ? "Not started yet" : "Completed"}} : todo)
    );
};


const deleteTodo  = id => {
  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
};


const reDoTodo = id => {
  setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)
  );
}

const editTask = (task, id) => {
  setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)
  );
}

const loadTodosFromLocalStorage = (userId) => {
  const savedTodos = localStorage.getItem(`todos_${userId}`)
  if (savedTodos) {
      return JSON.parse(savedTodos)
  }
  return []
}


  const saveTodosToLocalStorage = (userId, todos) => {
  localStorage.setItem(`todos_${userId}`, JSON.stringify(todos)) }

  useEffect(() => {
    if (currentUser) {
      setTodos(loadTodosFromLocalStorage(currentUser.userId));
    }
  }, [currentUser]);

useEffect(() => {
  if (currentUser) {
    saveTodosToLocalStorage(currentUser.userId, todos)
  }
}, [todos, currentUser])



  const defaultusers = [
    {
      profil: "Melissa", 
      userId: 1,
      inlog: {username: "Melissa_96", password:"123"},

    },
    {
      profil: "Ellen", 
      userId: 2,
      inlog: {username: "Ellen_97", password: "456"}
    
    },
    {
      profil: "Yolanda", 
      userId: 3,
      inlog: {username: "Yolanda_98", password: "789"}
    }
  ]

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users")
    return savedUsers ? JSON.parse(savedUsers) : defaultusers })


  const defaultHabits = [
    {
      title: "Träna",
      priority: "medel",
      rep: 5,
      userId: 1,
  },
  {
      title: "Plugga",
      priority: "hög",
      rep: 4,
      userId: 1,
  },
  {
      title: "Meditera",
      priority: "låg",
      rep: 2,
      userId: 1,
  },
  {
    title: "Läsa",
    priority: "låg",
    rep: 10,
    userId: 2,
  },
  {
    title: "Måla",
    priority: "låg",
    rep: 5,
    userId: 2,
  },
  {
    title: "Mindfullness",
    priority: "medel",
    rep: 2,
    userId: 2,
  },
  {
    title: "Simma",
    priority: "låg",
    rep: 2,
    userId: 3,
  },
  {
    title: "Umgås med kompisar",
    priority: "hög",
    rep: 7,
    userId: 3,
  },
  {
    title: "Lägga sig tidigt",
    priority: "hög",
    rep: 5,
    userId: 3,
  }
  ]


  const [habits, setHabits] = useState(() => {
      const savedHabits = localStorage.getItem("habits")
      return savedHabits ? JSON.parse(savedHabits) : defaultHabits })

  


  useEffect( () => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultusers));
    }}, []);

 

  const getUserHabits = () => {
    if(!currentUser) return []
    return habits.filter((habit) => habit.userId === currentUser.userId)
  }

  const newHabitId = () => {
    return currentUser ? currentUser.userId : null
  }

 
  const addHabit = (habit) => {
    setHabits([...habits, habit])
  }

  const getUserEvents = () => {
    return currentUser ? events.filter((event) => event.userId === currentUser.userId) : [];
  };

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  

  const newEventId = () => {
    return currentUser ? currentUser.userId: null
   };

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };


  const filteredEvents = events.filter((event) => event.userId === (currentUser?.userId || null));

  const sortedFilteredEvents = filteredEvents
      .sort((a, b) => new Date(`${a.endDate}T${a.endTime}`).getTime() - new Date(`${b.endDate}T${b.endTime}`).getTime())
      .filter((event) => {
          const eventTime = new Date(`${event.endDate}T${event.endTime}`).getTime();
          if (filterMode === "upcoming") {
              return eventTime >= new Date().getTime();
          } else if (filterMode === "past") {
              return eventTime < new Date().getTime();
          }
          return true;
      });


  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
          const eventsFromLocalStorage = JSON.parse(
          localStorage.getItem("events")
      );
       if (eventsFromLocalStorage) {
          setEvents(eventsFromLocalStorage)
       } else {
          setEvents([])
       }
      }, [])



 

  

  return (
    <>

    

    <h1 style={{fontFamily:"fantasy", color:"pink", 
      textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}> 
      Productivity Assistant Application</h1>

      {location.pathname !== "/start" && location.pathname !== "/" && location.pathname !== "/reg" && (<Navigation />)}

  {currentUser &&   
     <div>
      <h2>Välkommen, {currentUser.profil}</h2>
      <Quote/>
    </div>
     
      }




    <Routes>
     
      <Route path="/" element = {<Login onLogin={handleLogin}/>} />
      <Route path="/start" element={<Startsida habits={getUserHabits()} todos={todos} events ={getUserEvents()}/>} />
      <Route path="/habits" element={<Habitsx habits={getUserHabits()} setHabits={setHabits}/>}/>
      <Route path="/newhabit" element={<NewHabit addHabit={addHabit} newHabitId={newHabitId}/>}/>
      <Route path = "/reg" element = {<Registrera addUser={addUser}/>}/>
      <Route path ="/events" element = {<EventItem/>}/>
      <Route path="/AddEvent" element={ <AddEvent
        addEvent={addEvent}
        name={name}
        startTime={startTime}
        endTime={endTime}
        startDate={startDate}
        endDate={endDate}
        setName={setName}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />} />
      <Route path="/Events" element={<Events
          sortedFilteredEvents = {sortedFilteredEvents}
          filteredEvents = {filteredEvents}
          events={events}
          currentUser={currentUser}
          addEvent={addEvent}
          name={name} setName={setName}
          startTime={startTime} setStartTime={setStartTime}
          endTime={endTime} setEndTime={setEndTime}
          startDate={startDate} setStartDate={setStartDate}
          endDate={endDate} setEndDate={setEndDate}
          isEditing={isEditing} setIsEditing={setIsEditing}
          editedEvent={editedEvent} setEditedEvent={setEditedEvent}
          filterMode={filterMode} setFilterMode={setFilterMode}
          deleteEvent={deleteEvent}
          handleEditEvent={handleEditEvent}
          updateEvent={updateEvent}
          toggleFilter={toggleFilter}
        />} />

        <Route path = "/TodoWrapper" element = {<TodoWrapper currentUser={currentUser} setTodos={setTodos} addNewTodo={addNewTodo}
        changeStatus = {changeStatus} deleteTodo ={deleteTodo} reDoTodo={reDoTodo} editTask= {editTask} todos={todos}/>} />
       


    </Routes>
    <br />
    <br />

    {currentUser && 
    <div>
      <h2>Välkommen, {currentUser.profil}</h2>
      <button style={{backgroundColor:"pink", fontFamily:"fantasy"}} onClick={handleLogout}>Logga ut</button>
    </div>
      
      }

    </>
  )
}
export default App
