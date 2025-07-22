import { render, screen } from "@testing-library/react";
import Task from "./Task";
import { TaskHelpers } from "../../../__testUtils__/helpers/Task.helpers";
import { tasks } from "../../../__testUtils__/mocks/Task.mock";
import userEvent from "@testing-library/user-event";

const mockAddTask = vi.fn();
const mockhandleTaskDelete = vi.fn();
const user = userEvent.setup();
const taskErrorMessage = "added tasks must have atleast 4 characters";
describe("Task component", () => {
  test("scafolding elements render with taskError when no task props", () => {
    render(
      <Task
        handleAddTask={mockAddTask}
        tasks={[]}
        projectId="1"
        handleTaskDelete={mockhandleTaskDelete}
      />
    );
    const { header, taskInput, addTaskButton, noTasksMessage } =
      TaskHelpers.getElements();
    expect(header).toBeInTheDocument();
    expect(taskInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
    expect(noTasksMessage).toBeInTheDocument();
  });
  test("tasks props present: listitems render and hides No-task message", () => {
    render(
      <Task
        handleAddTask={mockAddTask}
        tasks={tasks}
        projectId="1"
        handleTaskDelete={mockhandleTaskDelete}
      />
    );
    const { taskElements } = TaskHelpers.getElements();
    expect(taskElements).toHaveLength(2);
    expect(screen.getByText("test task 1")).toBeInTheDocument();
    expect(screen.getByText("test task 2")).toBeInTheDocument();
  });
});

describe("user input actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Task
        handleAddTask={mockAddTask}
        tasks={[]}
        projectId="1"
        handleTaskDelete={mockhandleTaskDelete}
      />
    );
  });
  test("validation: task input displays error if under 4 charcters", async () => {
    await TaskHelpers.actions.taskInput(user, "123");
    await TaskHelpers.actions.addTaskButton(user);
    expect(screen.getByText(taskErrorMessage)).toBeInTheDocument();
  });
  test("validation: task input displays no error if over 4 charcters", async () => {
    await TaskHelpers.actions.taskInput(user, "1234");
    await TaskHelpers.actions.addTaskButton(user);
    expect(screen.queryByText(taskErrorMessage)).not.toBeInTheDocument();
  });
  test("addtask is called with correct props", async () => {
    await TaskHelpers.actions.taskInput(user, "1234");
    await TaskHelpers.actions.addTaskButton(user);
    expect(mockAddTask).toBeCalledTimes(1);
    expect(mockAddTask).toBeCalledWith({
      projectId: "1",
      taskId: "0",
      description: "1234",
    });
  });
});

describe("user clear button", async () => {
  vi.clearAllMocks();
  test("deletTask is called with correct props", async () => {
    render(
      <Task
        handleAddTask={mockAddTask}
        tasks={tasks}
        projectId="1"
        handleTaskDelete={mockhandleTaskDelete}
      />
    );
    await TaskHelpers.actions.clearButton(user, "task0");
    expect(mockhandleTaskDelete).toBeCalledTimes(1);
    expect(mockhandleTaskDelete).toHaveBeenCalledWith({
      projectId: "1",
      taskId: "0",
    });
  });
});
