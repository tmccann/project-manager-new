import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

export const Task = {
  getElements: () => ({
    header: screen.getByRole("heading", { level: 2 }),
    taskInput: screen.getByLabelText("Add new task"),
    addTaskButton: screen.getByRole("button", { name: "Add Task" }),
    taskElements: screen.queryAllByRole("listitem"),
    noTasksMessage: screen.queryByText(
      "This project does not have any tasks yet."
    ),
  }),
  actions: {
    async addTaskButton(user: UserEvent, name: string) {
      await user.click(screen.getByRole("button", { name: name }));
    },
    async taskInput(user: UserEvent, label: string, inputText: string) {
      await user.type(screen.getByLabelText(label), inputText);
    },
    async clearButton(user: UserEvent, testId: string) {
      await user.click(screen.getByTestId(testId));
    },
  },
};
