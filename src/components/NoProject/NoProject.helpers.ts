import { screen } from "@testing-library/dom";
import type { UserEvent } from "@testing-library/user-event";

export const NoProject = {
  getElements: () => ({
    messages: [
      screen.getByText("No project selected"),
      screen.getByText("Select a project"),
      screen.getByText("or"),
    ],
    sharedMessage: screen.getByText("Create a new project to get started"),
    addNewProjectButton: screen.getByRole("button", {
      name: "+ Create New Project",
    }),
  }),

  actions: {
    async clickAddButton(user: UserEvent) {
      await user.click(
        screen.getByRole("button", { name: "+ Create New Project" })
      );
    },
  },
};
