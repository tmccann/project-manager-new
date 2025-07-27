import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

const today = new Date().toLocaleDateString();
export const formattedDate = new Date(today).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const validInput = {
  title: "My Valid Title",
  dueDate: today,
  description: "My Valid Description",
};
export const invalidInputs = {
  title: "123",
  description: "456",
  dueDate: "11/11/2021",
};
export const errorMessages = {
  title: "Title too short!",
  description: "Description too short!",
  dueDate: "Due date must be today or later",
};
export const ProjectFormHelpers = {
  getElements: () => ({
    titleInput: screen.getByLabelText("Title"),
    descriptionInput: screen.getByLabelText("Description"),
    dueDateInput: screen.getByLabelText("Due Date"),
    saveButton: screen.getByRole("button", { name: "Save" }),
    cancelButton: screen.getByRole("button", { name: "Cancel" }),
    titleError: screen.queryByText(errorMessages.title),
    descriptionError: screen.queryByText(errorMessages.description),
    dueDateError: screen.queryByText(errorMessages.dueDate),
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
    // Valid inputs
    validInputs: {
      async enterValidTitle(user: UserEvent) {
        await user.type(screen.getByLabelText("Title"), validInput.title);
      },
      async enterValidDescription(user: UserEvent) {
        await user.type(
          screen.getByLabelText("Description"),
          validInput.description
        );
      },
      async enterValidDate(user: UserEvent) {
        await user.type(screen.getByLabelText("Due Date"), validInput.dueDate);
      },
    },
    invalidInputs: {
      //  Invalid Inputs
      async enterInvalidTitle(user: UserEvent) {
        await user.type(screen.getByLabelText("Title"), invalidInputs.title);
      },
      async enterInvalidDescription(user: UserEvent) {
        await user.type(
          screen.getByLabelText("Description"),
          invalidInputs.description
        );
      },
      async enterInvalidDate(user: UserEvent) {
        await user.type(
          screen.getByLabelText("Due Date"),
          invalidInputs.dueDate
        );
      },
    },
  },
};
