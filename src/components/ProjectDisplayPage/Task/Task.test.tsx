import { render, screen } from "@testing-library/react";
import Task from "./Task";
import { Task as TaskHelpers } from "./Task.helpers";
import userEvent from "@testing-library/user-event";

const mockAddTask = vi.fn();
const user = userEvent.setup();

const taskErrorMessage = "added tasks must have atleast 4 characters";
describe("Task component", () => {
  beforeEach(() => {
    render(<Task handleAddTask={mockAddTask} />);
  });
  test("scafolding elements render", () => {
    const { header, taskInput, addTaskButton, noTasksMessage } =
      TaskHelpers.getElements();
    expect(header).toBeInTheDocument();
    expect(taskInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
    expect(noTasksMessage).toBeInTheDocument();
  });
  test("task input accepts user input", async () => {
    const { taskInput } = TaskHelpers.getElements();
    await TaskHelpers.actions.taskInput(user, "Add new task", "1234");
    expect(taskInput).toHaveValue("1234");
  });
  test("add task button calls mockAddTask onClick", async () => {
    await TaskHelpers.actions.taskInput(user, "Add new task", "1234");
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    expect(mockAddTask).toHaveBeenCalled();
  });
});

describe("input validation", () => {
  beforeEach(() => {
    render(<Task handleAddTask={mockAddTask} />);
  });
  test("error displayed if empty task added", async () => {
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    expect(screen.getByText(taskErrorMessage)).toBeInTheDocument();
  });
  test("error displayed if added task character count under 4", async () => {
    await TaskHelpers.actions.taskInput(user, "Add new task", "123");
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    expect(screen.getByText(taskErrorMessage)).toBeInTheDocument();
  });
  test("no error if input is valid", async () => {
    await TaskHelpers.actions.taskInput(user, "Add new task", "1234");
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    expect(screen.queryByText(taskErrorMessage)).not.toBeInTheDocument();
  });
});
describe("adding and removing tasks", () => {
  beforeEach(() => {
    render(<Task handleAddTask={mockAddTask} />);
  });
  test("task is displayed when added an no task message removed", async () => {
    await TaskHelpers.actions.taskInput(user, "Add new task", "project task 1");
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    const { tasks } = TaskHelpers.getElements();
    expect(tasks).toHaveLength(1);
    expect(screen.getByText("project task 1")).toBeInTheDocument();
  });
  test("tasks can be added and removed", async () => {
    await TaskHelpers.actions.taskInput(user, "Add new task", "project task 1");
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    const { tasks } = TaskHelpers.getElements();
    screen.debug();
    expect(tasks).toHaveLength(1);
    expect(screen.getByText("project task 1")).toBeInTheDocument();
    await TaskHelpers.actions.taskInput(user, "Add new task", "project task 2");
    await TaskHelpers.actions.addTaskButton(user, "Add Task");
    const taskCount = screen.queryAllByRole("listitem");
    expect(taskCount).toHaveLength(2);
    expect(screen.getByText("project task 2")).toBeInTheDocument();
    await TaskHelpers.actions.clearButton(user, "task0");
    expect(screen.queryByText("project task 1")).not.toBeInTheDocument();
  });
});
