import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

export const ProjectForm = {
  getElements: () => ({
    titleInput: screen.getByLabelText("Title"),
    descriptionInput: screen.getByLabelText("Description"),
    dueDateInput: screen.getByLabelText("Due Date"),
    saveButton: screen.getByRole("button", { name: "Save" }),
    cancelButton: screen.getByRole("button", { name: "Cancel" }),
  }),
  actions: {
    async clickButton(user: UserEvent, name: string) {
      await user.click(screen.getByRole("button", { name: name }));
    },
    async userInput(user: UserEvent, label: string, inputText: string) {
      await user.type(screen.getByLabelText(label), inputText);
    },
  },
};
