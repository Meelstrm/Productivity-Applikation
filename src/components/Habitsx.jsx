import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Habitsx({ habits, setHabits }) {
  const [SFHabits, setSFHabits] = useState(habits);
  const navigation = useNavigate();

  const radera = (index) => {
    const uppdaterad = SFHabits.filter((_, i) => i !== index);
    setSFHabits(uppdaterad);
    setHabits(uppdaterad);
    localStorage.setItem("habits", JSON.stringify(uppdaterad));
  };

  const filtrera = (e) => {
    const filtreraH = e.target.value;

    if (!filtreraH) {
      setSFHabits([...habits]);
      return;
    }

    const nyaFilt = habits.filter(
      (habit) => habit.priority.toLowerCase() === filtreraH.toLowerCase()
    );

    setSFHabits(nyaFilt);
  };

  const sortera = (e) => {
    const sorteraH = e.target.value;
    const nyaSort = [...SFHabits];

    if (sorteraH === "Repetition") {
      nyaSort.sort((a, b) => b.rep - a.rep);
    } else if (sorteraH === "Prioritet") {
      const omvanldaPrio = { hög: 3, medel: 2, låg: 1 };
      nyaSort.sort(
        (a, b) => omvanldaPrio[b.priority] - omvanldaPrio[a.priority]
      );
    }

    setSFHabits(nyaSort);
  };

  const repUpp = (index) => {
    const uppdaterad = SFHabits.map((habit, i) => {
      if (i === index) {
        return { ...habit, rep: Number(habit.rep) + 1 };
      }
      return habit;
    });
    setSFHabits(uppdaterad);
    setHabits(uppdaterad);
    localStorage.setItem("habits", JSON.stringify(uppdaterad));
  };

  const repNer = (index) => {
    const uppdaterad = SFHabits.map((habit, i) => {
      if (i === index) {
        return { ...habit, rep: Number(habit.rep) - 1 };
      }
      return habit;
    });
    setSFHabits(uppdaterad);
    setHabits(uppdaterad);
    localStorage.setItem("habits", JSON.stringify(uppdaterad));
  };

  const repNoll = (index) => {
    const uppdaterad = SFHabits.map((habit, i) => {
      if (i === index) {
        return { ...habit, rep: 0 };
      }
      return habit;
    });
    setSFHabits(uppdaterad);
    setHabits(uppdaterad);
    localStorage.setItem("habits", JSON.stringify(uppdaterad));
  };

  return (
    <>
      <h2>RUTINER</h2>

      <div className="SortFilt" style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <div>
          <label htmlFor="SortVal">Sortera efter: </label>
          <select id="SortVal" onChange={sortera}>
            <option value="">Välj här</option>
            <option value="Repetition">Repetitioner</option>
            <option value="Prioritet">Prioritet</option>
          </select>
        </div>

        <div>
          <label htmlFor="FiltVal">Filtrera efter:</label>
          <select id="FiltVal" onChange={filtrera}>
            <option value="">Välj här</option>
            <option value="låg">Låg</option>
            <option value="medel">Medel</option>
            <option value="hög">Hög</option>
          </select>
        </div>
      </div>

      <div className="habits-list" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {SFHabits.map((habit, i) => (
          <div
            style={{
              border: "solid 2px",
              backgroundColor: "lightpink",
              margin: "10px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
            key={i}
          >
            <h2
              style={{
                fontFamily: "fantasy",
                color: "pink",
                textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
              }}
            >
              {habit.title}
            </h2>
            <div>Prioritet: {habit.priority}</div>
            <div>Repetitioner: {habit.rep}</div>
            <div>
              <button onClick={() => repUpp(i)}>+</button>
              <button onClick={() => repNer(i)}>-</button>
              <button onClick={() => repNoll(i)}>Nollställ</button>
            </div>
            <button
              style={{ marginTop: "10px", backgroundColor: "red", color: "white", padding: "5px 10px", border: "none" }}
              onClick={() => radera(i)}
            >
              Radera
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigation("/newhabit")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Skapa ny Rutin
      </button>
    </>
  );
}

export default Habitsx;
