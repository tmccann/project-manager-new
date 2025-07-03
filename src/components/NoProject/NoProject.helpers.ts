import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";

export const NoProject = {
  // TODO: Update getElements to use findByText to support conditional rendering
  getElements: () => ({
    messages: [
      screen.getByText("No project selected"),
      screen.getByText("Select a project"),
      screen.getByText("or"),
    ],
    sharedMessage: screen.getByText("Create a new project to get started"),
    addNewProjectButton: screen.getByRole("button", {
      name: "Create New Project",
    }),
  }),

  actions: {
    async clickAddButton(user: UserEvent, label: string) {
      await user.click(screen.getByRole("button", { name: label }));
    },
  },
};
