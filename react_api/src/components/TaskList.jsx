import { useEffect, useState } from "react";
import { getAllTask } from "../api/tasks.api";
import { TaskCard } from "./taskCard";
export function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTask();
      setTasks(res.data);
    }
    loadTasks();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
