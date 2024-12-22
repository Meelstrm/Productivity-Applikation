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
import { useLocation } from 'react-router-dom';



function App() { 
  const navigate = useNavigate()
  const location = useLocation()

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });


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


  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };


  const addEvent = (newEvent) => {
    const updatedEvent = { ...newEvent, userId: currentUser.userId };
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, updatedEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const handleAddEvent = (newEvent) => {
    addEvent(newEvent);
    navigate("/start");
  };


  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);


  const getUserEvents = () => (currentUser ? events.filter((event) => event.userId === currentUser.userId) : []);



  return (
    <>

    <h1 style={{fontFamily:"fantasy", color:"pink", 
      textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}> 
      Productivity Assistant Application</h1>

      {location.pathname !== "/start" && location.pathname !== "/" && location.pathname !== "/reg" && (<Navigation />)}

  {currentUser &&   
     <div>
      <h3>Välkommen, {currentUser.profil}</h3>
      <Quote/>
    </div>
     
      }



    <Routes>
     
      <Route path="/" element = {<Login onLogin={handleLogin}/>} />
      <Route path="/start" element={<Startsida habits={getUserHabits()} todos={todos} events={getUserEvents()}/>} />
      <Route path="/habits" element={<Habitsx habits={getUserHabits()} setHabits={setHabits}/>}/>
      <Route path="/newhabit" element={<NewHabit addHabit={addHabit} newHabitId={newHabitId}/>}/>
      <Route path = "/reg" element = {<Registrera addUser={addUser}/>}/>
      <Route path="/Events" element={<Events events={getUserEvents()} currentUser={currentUser} addEvent={handleAddEvent} setEvents={setEvents} />} />    
      <Route path = "/TodoWrapper" element = {<TodoWrapper currentUser={currentUser} setTodos={setTodos} addNewTodo={addNewTodo}
        changeStatus = {changeStatus} deleteTodo ={deleteTodo} reDoTodo={reDoTodo} editTask= {editTask} todos={todos}/>} />

   </Routes>

    <br />
    <br />

    {currentUser && 
       <div>
          <button style={{backgroundColor:"pink", fontFamily:"fantasy"}} onClick={handleLogout}>Logga ut</button>
       </div>
      
      }

    </>
  )
}
export default App
