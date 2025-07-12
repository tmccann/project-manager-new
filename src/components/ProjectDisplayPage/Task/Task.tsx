import React, { useRef, useState } from "react";

type TaskProps = {
  handleAddTask: (e: string) => void;
};

type NewTask = {
  id: number;
  description: string;
};

const Task = ({ handleAddTask }: TaskProps) => {
  // temporary array to store task till app state used
  const [tasks, setTasks] = useState<NewTask[]>([]);
  const [error, setError] = useState(false);

  // use ref to accees input change
  const task = useRef<HTMLInputElement>(null);

  //  task validation min of 4 char
  const onValidText = (ref: React.RefObject<HTMLInputElement>) => {
    const textElement = ref.current;
    if (!textElement) return null;
    const val = textElement.value;
    return val.length >= 4 ? val : null;
  };

  const handleNewTaskValidation = () => {
    const newTask = onValidText(task);
    const id = tasks.length === 0 ? 0 : tasks.length;
    if (newTask) {
      setError(false);
      setTasks((prev) => [...prev, { id: id, description: newTask }]);
      handleAddTask(newTask);
      onClear();
    } else {
      setError(true);
    }
  };

  const onClear = () => {
    if (task.current) task.current.value = "";
  };

  const onDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  return (
    <section>
      <h2>Tasks</h2>
      {/* label will be hidden later using tail wind sr-only */}
      <label htmlFor="task" style={{ position: "absolute", left: "-9999px" }}>
        Add new task
      </label>
      <input type="text" id="task" ref={task} minLength={4} />
      <button onClick={handleNewTaskValidation}>Add Task</button>
      {error && <p>added tasks must have atleast 4 characters</p>}
      {/*if no tasks show no task message */}
      {tasks.length === 0 ? (
        <p>This project does not have any tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} id={task.id.toString()}>
              <p>
                {task.description}
                <button
                  onClick={() => onDelete(task.id)}
                  data-testid={`task${task.id}`}
                >
                  Clear
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Task;
