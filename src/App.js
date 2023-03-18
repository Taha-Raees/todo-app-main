import { useEffect, useState } from "react";
import GoalForm from "./Components/GoalForm";
import GoalList from "./Components/GoalList";
import './App.scss'

function App() {
  const [allGoals, setAllGoals] = useState(
    JSON.parse(localStorage.getItem('goals') || '[]')
  );
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(allGoals));
  }, [allGoals]);

  const addGoal = (formData) => {
    setAllGoals([...allGoals, formData]);
    console.log(allGoals);
  };

  return (
    <div className="app">
      <img src="./images/bg-desktop-dark.jpg"/>
      <div className="component">
      <GoalForm onAdd={addGoal} />
      <GoalList allGoals={allGoals} setAllGoals={setAllGoals} />
      </div>
      <h3>drag & drop to reorder</h3>
    </div>
  );
}

export default App;

