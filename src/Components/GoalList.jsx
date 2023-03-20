import React, { useEffect, useState } from "react";
import "./GoalList.scss";

const GoalList = (props) => {
  const [done, setDone] = useState(false);
  const [unDone, setUnDone] = useState(false);
  const [chec, setChec] = useState(() => {
    const savedState = localStorage.getItem("checkboxState");
    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return props.allGoals.map(() => "notick");
    }
  });

  useEffect(() => {
    localStorage.setItem("checkboxState", JSON.stringify(chec));
  }, [chec]);

  const handleGoalCheck = (index) => {
    const newGoals = [...props.allGoals];
    newGoals[index].check = !newGoals[index].check;
    props.setAllGoals(newGoals);

    setChec((prevChec) => {
      const newState = [...prevChec];
      if (index < prevChec.length) {
        newState[index] = newGoals[index].check ? "tick" : "notick";
      } else {
        newState.push(newGoals[index].check ? "tick" : "notick");
      }
      return newState;
    });
  };

  const handleDelete = (index) => {
    const filtered = filteredGoals(); 
    const goalToDelete = filtered[index]; 
    const newGoals = props.allGoals.filter((g) => g !== goalToDelete); 
    props.setAllGoals(newGoals);
  };

  const handleDeleteClick = () => {
    props.setAllGoals([]);
  };

  const filteredGoals = () => {
    if (done && unDone) {
      return props.allGoals;
    } else if (done) {
      return props.allGoals.filter((g) => g.check);
    } else if (unDone) {
      return props.allGoals.filter((g) => !g.check);
    } else {
      return props.allGoals;
    }
  };

  const count = props.allGoals.filter((g) => !g.check).length;

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDrop = (event, newIndex) => {
    const oldIndex = event.dataTransfer.getData("index");
    const newGoals = [...props.allGoals];
    const draggedGoal = newGoals.splice(oldIndex, 1)[0];
    newGoals.splice(newIndex, 0, draggedGoal);
    props.setAllGoals(newGoals);


    const newChec = [...chec];
    const movedItemChec = newChec.splice(oldIndex, 1)[0];
    newChec.splice(newIndex, 0, movedItemChec);
    setChec(newChec);
  };

  return (
    <div className="list">
      <ul>
        {filteredGoals().map((g, index) => (
          <li
            key={g.goal}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={(event) => event.preventDefault()}
          >
            <section>
              <input
                type="checkbox"
                checked={g.check}
                onChange={() => handleGoalCheck(index)}
              />
              {g.goal}
              <img className={g.check ? "tick" : "notick"} src={require('./icon-check.svg').default} alt="" onClick={() => handleGoalCheck(index)}/>
              <img className="cross" src={require('./icon-cross.svg').default} alt=""  onClick={() => handleDelete(index)} />
            </section>
            <hr />
          </li>
        ))}
      </ul>
      <div className="button">
    <span>{count} items left</span>
    <div className="filter">
    <button onClick={() => {
        setUnDone(false);
        setDone(false);
      }}>
        All
      </button>
      <button onClick={() => setUnDone(unDone===false?true:true)}>Active</button>
      <button onClick={() => setDone(done===false?true:true)}>Completed</button>
    </div>
      <button onClick={handleDeleteClick}>Clear All</button>
    </div>
    </div>
  );
};

export default GoalList;




