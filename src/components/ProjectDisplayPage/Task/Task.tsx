import { useRef, useState } from "react";
import { TaskItem } from "../../../types/types";
import { isValidText } from "../../../utils/Validations";

export type TaskProps = {
  handleAddTask: ({
    projectId,
    description,
  }: {
    projectId: string;
    description: string;
  }) => void;
  projectId: string;
  tasks: TaskItem[];
  handleTaskDelete: (deleteTaskData: DeleteTaskData) => void;
};

export type DeleteTaskData = {
  projectId: string;
  id: string;
};

const Task = ({
  handleAddTask,
  tasks,
  projectId,
  handleTaskDelete,
}: TaskProps) => {
  // Temporary array to store task till app state used
  const [error, setError] = useState(false);
  // Use ref to accees input change
  const task = useRef<HTMLInputElement>(null);

  //  Task validation min of 4 char

  const handleNewTaskValidation = () => {
    const current = task.current?.value ?? "";
    const newTask = isValidText(current);

    if (newTask) {
      setError(false);
      handleAddTask({ projectId, description: newTask });
      onClear();
    } else {
      setError(true);
    }
  };

  const onClear = () => {
    if (task.current) task.current.value = "";
  };

  return (
    <section>
      <h2 className=" text-2xl font-bold text-stone-600 my-2">Tasks</h2>
      {/* Label will be hidden later using tail wind sr-only */}
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
      {/*If no tasks show no task message */}
      {tasks.length === 0 ? (
        <p>This project does not have any tasks yet.</p>
      ) : (
        <ul className=" bg-stone-100 rounded-sm">
          {tasks.map((task) => {
            return (
              <li
                className=" flex justify-between my-2 p-1"
                key={task.id}
                id={task.id}
                data-testid={"taskList"}
              >
                <p>{task.description}</p>
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={() => {
                    handleTaskDelete({ projectId, id: task.id });
                  }}
                  data-testid={`task${task.id}`}
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Task;
