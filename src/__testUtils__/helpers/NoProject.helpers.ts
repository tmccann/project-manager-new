import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";

export const NoProject = {
  // Using queryByText instead of getByText to safely handle conditional rendering
  getElements: () => ({
    messages: [
      screen.queryByText("No project selected"),
      screen.queryByText("Select a project"),
      screen.queryByText("or"),
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
