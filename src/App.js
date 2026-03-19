import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleTask, deleteTask, setFilter } from "./taskSlice";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const { tasks, filter } = useSelector((state) => state.task);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Manager</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={() => {
        dispatch(addTask(input));
        setInput("");
      }}>
        Add
      </button>

      <div>
        <button onClick={() => dispatch(setFilter("all"))}>All</button>
        <button onClick={() => dispatch(setFilter("completed"))}>Completed</button>
        <button onClick={() => dispatch(setFilter("pending"))}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => dispatch(toggleTask(task.id))}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {task.text}
            </span>

            <button onClick={() => dispatch(deleteTask(task.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;