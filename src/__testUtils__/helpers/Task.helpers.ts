import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

export const TaskHelpers = {
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
    async addTaskButton(user: UserEvent) {
      await user.click(screen.getByRole("button", { name: "Add Task" }));
    },
    async taskInput(user: UserEvent, inputText: string) {
      await user.type(screen.getByLabelText("Add new task"), inputText);
    },
    async clearButton(user: UserEvent, testId: string) {
      await user.click(screen.getByTestId(testId));
    },
  },
};
