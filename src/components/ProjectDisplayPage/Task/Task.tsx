import { useRef, useState } from "react";
import { TaskItem } from "../../../types/types";

export type TaskProps = {
  handleAddTask: (task: TaskItem) => void;
  projectId: string;
  tasks: TaskItem[];
  handleTaskDelete: (data: TaskDeleteProps) => void;
};

export type TaskDeleteProps = {
  projectId: string;
  taskId: string;
};

const Task = ({
  handleAddTask,
  tasks,
  projectId,
  handleTaskDelete,
}: TaskProps) => {
  // temporary array to store task till app state used
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
    const taskId = tasks.length === 0 ? "1" : (tasks.length + 1).toString();

    if (newTask) {
      setError(false);
      handleAddTask({ projectId, taskId, description: newTask });
      onClear();
    } else {
      setError(true);
    }
  };

  const onClear = () => {
    if (task.current) task.current.value = "";
  };

  // const onDelete = (id: number) => {
  //   setTasks((prev) => prev.filter((task) => task.id !== id));
  // };
  return (
    <section>
      <h2 className=" text-2xl font-bold text-stone-600 my-2">Tasks</h2>
      {/* label will be hidden later using tail wind sr-only */}
      <div className="flex gap-2 items-center">
        <label htmlFor="task" style={{ position: "absolute", left: "-9999px" }}>
          Add new task
        </label>
        <input
          className=" bg-stone-300 rounded-sm py-1 px-2 mb-2"
          type="text"
          id="task"
          ref={task}
          minLength={4}
        />
        <button className="py-1 px-2 mb-2 " onClick={handleNewTaskValidation}>
          Add Task
        </button>
      </div>
      {error && <p>added tasks must have atleast 4 characters</p>}
      {/*if no tasks show no task message */}
      {tasks.length === 0 ? (
        <p>This project does not have any tasks yet.</p>
      ) : (
        <ul className=" bg-stone-100 rounded-sm">
          {tasks.map((task) => (
            <li
              className=" flex justify-between my-2 p-1"
              key={task.taskId}
              id={task.taskId}
            >
              <p>{task.description}</p>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => {
                  handleTaskDelete({ projectId, taskId: task.taskId });
                }}
                data-testid={`task${task.taskId}`}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Task;
