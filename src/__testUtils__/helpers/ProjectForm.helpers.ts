import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

const today = new Date().toLocaleDateString();

export const ProjectForm = {
  validInput: {
    title: "My Valid Title",
    description: "My Valid Description",
    dueDate: today,
  },
  getElements: () => ({
    titleInput: screen.getByLabelText("Title"),
    descriptionInput: screen.getByLabelText("Description"),
    dueDateInput: screen.getByLabelText("Due Date"),
    saveButton: screen.getByRole("button", { name: "Save" }),
    cancelButton: screen.getByRole("button", { name: "Cancel" }),
  }),
  actions: {
    buttons: {
      async clickSave(user: UserEvent) {
        await user.click(screen.getByRole("button", { name: "Save" }));
      },
      async clickCancel(user: UserEvent) {
        await user.click(screen.getByRole("button", { name: "Cancel" }));
      },
    },
    // valid inputs
    validInputs: {
      async enterValidTitle(user: UserEvent) {
        await user.type(screen.getByLabelText("Title"), "My Valid Title");
      },
      async enterValidDescription(user: UserEvent) {
        await user.type(
          screen.getByLabelText("Description"),
          "My Valid Description"
        );
      },
      async enterValidDate(user: UserEvent) {
        await user.type(screen.getByLabelText("Due Date"), today);
      },
    },
    invalidInputs: {
      //  invalid Inputs
      async enterInvalidTitle(user: UserEvent) {
        await user.type(screen.getByLabelText("Title"), "123");
      },
      async enterInvalidDescription(user: UserEvent) {
        await user.type(screen.getByLabelText("Description"), "456");
      },
      async enterInvalidDate(user: UserEvent) {
        await user.type(screen.getByLabelText("Due Date"), "31/12/2020");
      },
    },
  },
};
